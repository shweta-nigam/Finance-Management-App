import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { paymentCreateSchema, paymentUpdateSchema } from "../validators/payment.validator";
import { Payment } from "../models/payment.model";


export const createPayment = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }
    try {

        const validatedData = paymentCreateSchema.parse(req.body)

        const payment = await Payment.create({
            ...validatedData,
            user: user._id
        })


        res.status(201).json(new ApiResponse(201, {
            payment: {
                id: payment.id,
                date: payment.date,
                currency: payment.currency,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                receiptUrl: payment.receiptUrl,
                paymentId: payment.paymentId,
                orderId: payment.orderId,
                signature: payment.signature,
                isVerified: payment.isVerified
            }
        }, "Created payment successfully!"))

    } catch (error) {
        next(error)
    }
}

export const updatePayment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { id } = req.params ?? req.query


    if (!id) {
        return next(new ApiError(400, "payment Id is required."))
    }

    try {
        const validatedData = paymentUpdateSchema.parse(req.body)

        const payment = await Payment.findOneAndUpdate(
            { _id: id, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        )

        if (!payment) {
            return next(new ApiError(404, "Payment not found"));
        }


        res.status(200).json(new ApiResponse(200, {
            payment: {
                id: payment.id,
                amount: payment.amount,
                date: payment.date,
                currency: payment.currency,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                receiptUrl: payment.receiptUrl,
                paymentId: payment.paymentId,
                orderId: payment.orderId,
                isDeleted: payment.isDeleted,
                signature: payment.signature,
                isVerified: payment.isVerified
            }
        }, "Updated payment successfully."))

    } catch (error) {
        next(error)
    }
}

export const getPayment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { id } = req.params ?? req.query

    if (!id) {
        return next(new ApiError(400, "Payment Id is required."))
    }

    try {
        const payment = await Payment.findOne({
            _id: id,
            user: user._id
        })

        if (!payment) {
            return next(new ApiError(400, "Payment not found"))
        }


        res.status(200).json(new ApiResponse(200, payment, "Fetched payment  successfully."))

    } catch (error) {
        next(error)
    }
}

export const getAllPayment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const payments = await Payment.find({
            user: user._id
        }).select("amount date currency status paymentMethod receiptUrl paymentId orderId signature isVerified")

        if (!payments.length) {
            return next(new ApiError(404, "Payment(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, payments, "Fetched payment(s) successfully."))

    } catch (error) {
        next(error)
    }
}

export const deletePayment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { id } = req.params ?? req.query

    if (!id) {
        return next(new ApiError(400, "Payment Id is required."))
    }

    try {
        const payment = await Payment.findOneAndUpdate(
            { _id: id, user: user._id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        if (!payment) {
            return next(new ApiError(400, "Payment not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            payment: {
                id: payment.id,
                date: payment.date,
                currency: payment.currency,
                status: payment.status,
                paymentMethod: payment.paymentMethod,
                receiptUrl: payment.receiptUrl,
                paymentId: payment.paymentId,
                orderId: payment.orderId,
                signature: payment.signature,
                isVerified: payment.isVerified
            }
        }, "Deleted payment successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteAllPayments = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const payments = await Payment.updateMany(
            { user: user._id },
            { $set: { isDeleted: true } }
        )

        if (!payments) {
            return next(new ApiError(404, "Payment(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, payments, "Deleted payment(s) successfully."))

    } catch (error) {
        next(error)
    }
}