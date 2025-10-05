import { ApiError } from "../utils/apiError";
import { Request, NextFunction, Response } from "express"
import { ZodError } from "zod";

//Express expects error-handling middleware to have 4 parameters (err, req, res, next) — that’s how it recognizes it as an error handler.
export const errorHandler = (
    err: Error | ApiError | ZodError<any>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error caught by errorHandler:", err);

    //if it is our custom ApiError ,use its details
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data
        })
    }

    // Handle Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues
        })
    }

    // if it is some other error , send generic error

    return res.status(500).json({
        success: false,
        message: err.message || "Internal server Error"
    })
}



// syntax of errors
// throw new ApiError(...) → preferred, but only safe if wrapped with asyncHandler.
// return next(new ApiError(...)) → explicit, works everywhere.
// next(err) → when you already have an error (from Mongoose, JWT, etc).