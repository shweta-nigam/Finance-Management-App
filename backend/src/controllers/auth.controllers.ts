import { User } from "../models/user.model"
import { ApiError } from "../utils/apiError"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/mail"
import { ApiResponse } from "../utils/apiResponse"
import { NextFunction } from "express"
import bcrypt from "bcryptjs";
import crypto from "crypto"

export const register = async (req: any, res: any, next: NextFunction) => {
   // get the data , confirm it
   // check if user exist
   // hash password  -> middleware 
   // if not create new user
   // create token for verification through crypto
   // -> send verification token to email

   const { name, email, password, username } = req.body
   console.log(req.body);


   if (!name || !email || !password ||!username) {
      throw new ApiError(400, "All fields are required")
   }


   if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      throw new ApiError(400, "Invalid email format")
   }
   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(password)) {
      throw new ApiError(400, "Invalid password format")
   }



   try {
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

      res.status(200).json(new ApiResponse(200, {newUser:{id: newUser._id, name:newUser.name, email:newUser.email}}))

   } catch (error) {
      console.error("Error while registering the user.", error);
      next(error)
   }

}

export const verify = async (req: any, res: any, next: NextFunction) => {
   //get verification token from email
   // get token form db 
   // match both token to verify user

   const token = req.params.token || req.query.token 

   if (!token) {
      throw new ApiError(400, "Token is required")
   }
   try {

      const user = await User.findOne({
         verificationToken :token,
         verificationTokenExpiry: { $gt: new Date()} 
      })

      if (!user) {
         throw new ApiError(400, "User not found.")
      }
      user.isVerified = true
      user.verificationToken = undefined
      user.verificationTokenExpiry = undefined

      await user.save()


      res.status(200).json(new ApiResponse(200, {user:{id:user._id, name: user.name, username: user.username, isVerified: user.isVerified}}, "User verified successfully!"))

   } catch (error) {
      console.error("User verification failed.", error);
      next(error)
   }
}

export const login = async (req: any, res: any, next: NextFunction) => {
   // get data . validate it
   // create accessToken and refreshToken 
   // hash token then save in db

   const { email, password } = req.body
   if (!email || !password) {
      throw new ApiError(400, "All fields are required")
   }

   try {

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
         maxAge: 1000 * 60 * 60 * 24 * 7
      })

      res.status(200).json(new ApiResponse(200, { user: { id: user._id, email: user.email, name: user.name }, accessToken: token }))

   } catch (error) {
      console.error("Error while logging user.", error);
      next(error)

   }

}

export const logout = async (req: any, res: any, next: NextFunction) => {
   try {
      const user = req.user._id
      if (!user) {
         new ApiError(404, "user not found")
      }

      req.clearCookies()

      return res.status(200).json(new ApiResponse(200, null, "User logged out successfully!"))

   } catch (error) {
      console.error("Error while logging out.", error);
      next(error)
   }
}




