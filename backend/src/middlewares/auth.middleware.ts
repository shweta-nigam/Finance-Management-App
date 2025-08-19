import { NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req: any, res: any, next: NextFunction) => {
    // how to know if user is logged in? --  just match the token !

    //1 get the token
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        new ApiError(404, "Access denied, No token provided.")
    }

    //2 verify the token
    let decoded
    try {

        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
        req.user = decoded             // attach user info to req object
        next()                         // pass to next middleware or route handler


    } catch (error) {
        console.error("Error while decoding jwt token ---->", error);
        next()
    }

}