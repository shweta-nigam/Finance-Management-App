import { IUser, User } from "../models/user.model"
import { ApiError } from "../utils/apiError"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/mail"
import { ApiResponse } from "../utils/apiResponse"
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { OAuth2Client } from "google-auth-library"
import { loginUserSchema, registerUserSchema } from "../validators/user.validator"
import { toAuthResponse } from "../responses/toAuthResponse"

// RequestWithUser = a request object that also carries the logged-in user’s details.
export interface RequestWithUser extends Request {
   user?: IUser
}

export const register = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   // get the data , confirm it
   // check if user exist
   // hash password  -> middleware 
   // if not create new user
   // create token for verification through crypto
   // -> send verification token to email

   try {
      const validatedData = registerUserSchema.parse(req.body)

      const { name, email, password, username } = validatedData

      const existingUser = await User.findOne({ email })

      if (existingUser) {
         throw new ApiError(400, "User already exists.")
      }

      const newUser = await User.create(
         {
            name,
            email,
            password,
            username
         }
      )

      const rawToken = crypto.randomBytes(32).toString("hex")
      const token = crypto.createHash("sha256").update(rawToken).digest("hex")

      newUser.verificationToken = token;
      newUser.verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24)    // new Date() to make number into date
      await newUser.save()
      await sendEmail(newUser.email, token)

      res.status(201).json(new ApiResponse(201, { newUser: { id: newUser._id, name: newUser.name, email: newUser.email } }))

   } catch (error) {
      next(error)
   }

}

export const verify = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   //get verification token from email
   // get token form db 
   // match both token to verify user

   const token = req.params.token || req.query.token

   if (!token) {
      throw new ApiError(400, "Token is required")
   }
   try {

      const user = await User.findOne({
         verificationToken: token,
         verificationTokenExpiry: { $gt: new Date() }
      })

      if (!user) {
         throw new ApiError(404, "User not found.")
      }
      user.isVerified = true
      user.verificationToken = undefined
      user.verificationTokenExpiry = undefined

      await user.save()


      res.status(200).json(new ApiResponse(200, { user: { id: user._id, name: user.name, username: user.username, isVerified: user.isVerified } }, "User verified successfully!"))

   } catch (error) {
      console.error("User verification failed.", error);
      next(error)
   }
}

export const login = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   // get data . validate it
   // create accessToken and refreshToken 
   // hash token then save in db

   try {
      const validatedData = loginUserSchema.parse(req.body)

      const { email, password } = validatedData

      const user = await User.findOne({ email })
      if (!user) {
         throw new ApiError(400, "User not found")
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         throw new ApiError(400, "Invalid credentials");
      }

      if (!process.env.JWT_ACCESS_SECRET) {
         throw new Error("JWT_ACCESS_SECRET is not set in .env");
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" })
      //id:user._id -->  “create an object with a property called id whose value is user._id”
      //  ! → Tells TypeScript “don’t worry, this variable is definitely set”.

      user.accessToken = token
      user.accessTokenExpiry = new Date(Date.now() + 1000 * 60 * 15)

      if (!process.env.JWT_REFRESH_SECRET) {
         throw new Error("JWT_REFRESH_SECRET is not set");
      }
      const rawRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" })

      const hashRefreshToken = crypto.createHash("sha256").update(rawRefreshToken).digest("hex")


      // user.refreshToken = hashRefreshToken
      // user.refreshTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      // ----> no need to save refresh token in db as they are short lived.

      await user.save()

      res.cookie("refreshToken", rawRefreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development",
         sameSite: "lax",
         maxAge: 1000 * 60 * 60 * 24 * 30
      })

      res.status(200).json(new ApiResponse(200, { user: { id: user._id, email: user.email, name: user.name }, accessToken: token }))

   } catch (error) {
      next(error)
   }

}

export const logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   try {
      const user = req.user

      if (!user) {
         return next(new ApiError(404, "user not found"))
      }

      const cookieOptions = {
         httpOnly: true,
         secure: true,
         sameSite: "strict" as const,
      }

      res.clearCookie("accessToken", cookieOptions)

      res.clearCookie("refreshToken", cookieOptions)

      return res.status(200).json(new ApiResponse(200, null, "User logged out successfully!"))

   } catch (error) {
      next(error)
   }
}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
   try {

      const { idToken } = req.body      // frontend send google ID token

      if (!idToken) {
         return next(new ApiError(400, "Google Id is required"))
      }

      const ticket = await client.verifyIdToken({
         idToken,
         audience: process.env.GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload()

      if (!payload) {
         return next(new ApiError(400, "Invalid Google token"))
      }

      const { name, email, picture, sub } = payload

      let user = await User.findOne({ email })

      if (user) {
         const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
         const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" });
         res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
         });
         return res.status(200).json(new ApiResponse(200, toAuthResponse(user, accessToken), "Login successful via Google"));
      }


      user = await User.create({
         name,
         email,
         password: "",
         username: email?.split("@")[0],
         isVerified: true,
         googleId: sub,
         avatar: picture
      })

      if (!process.env.JWT_ACCESS_SECRET) {
         return next(new ApiError(400, "JWT Access secret is not set"))
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
         expiresIn: "15min"
      })

      if (!process.env.JWT_REFRESH_SECRET) {
         return next(new ApiError(400, "JWT Access secret is not set"))
      }

      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
         expiresIn: "30d"
      })

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development"
      })

      res.status(200).json(new ApiResponse(200, {
         user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
      }, accessToken))

   } catch (error) {
      next(error)
   }
}

