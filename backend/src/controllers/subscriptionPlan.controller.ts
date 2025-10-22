import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { SubscriptionPlan } from "../models/subscriptionPlan.model";
import { subscriptionPlanCreateSchema, subscriptionPlanUpdateSchema } from "../validators/subscriptionPlan.validator";




export const createSubscriptionPlan = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }
    try {

        const validatedData = subscriptionPlanCreateSchema.parse(req.body)

        const subscriptionPlan = await SubscriptionPlan.create({
            ...validatedData,
            user: user._id
        })


        res.status(201).json(new ApiResponse(201, {
            subscriptionPlan: {
                id: subscriptionPlan.id,
                title: subscriptionPlan.title,
                description: subscriptionPlan.description,
                content: subscriptionPlan.content,
                note: subscriptionPlan.note,
                price: subscriptionPlan.price,
                duration: subscriptionPlan.duration,
                renewalType: subscriptionPlan.renewalType,
                features: subscriptionPlan.features,
                isDeleted: subscriptionPlan.isDeleted,
                isActive: subscriptionPlan.isActive,
                cancelledAt: subscriptionPlan.cancelledAt,
                startedAt: subscriptionPlan.startedAt,
                expiredAt: subscriptionPlan.expiredAt,
                payment: subscriptionPlan.payment,
            }
        }, "Created subscriptionPlan successfully!"))

    } catch (error) {
        next(error)
    }
}

export const updateSubscriptionPlan = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const subscriptionPlanId = req.params?.subscriptionPlanId ?? req.query?.subscriptionPlanId

    if (!subscriptionPlanId) {
        return next(new ApiError(400, "subscriptionPlan Id is required."))
    }

    try {

        const validatedData = subscriptionPlanUpdateSchema.parse(req.body)

        const subscriptionPlan = await SubscriptionPlan.findOneAndUpdate(
            { _id: subscriptionPlanId, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        )

        if (!subscriptionPlan) {
            return next(new ApiError(404, "SubscriptionPlan not found"));
        }


        res.status(200).json(new ApiResponse(200, {
            subscriptionPlan: {
                id: subscriptionPlan.id,
                title: subscriptionPlan.title,
                description: subscriptionPlan.description,
                content: subscriptionPlan.content,
                note: subscriptionPlan.note,
                price: subscriptionPlan.price,
                duration: subscriptionPlan.duration,
                renewalType: subscriptionPlan.renewalType,
                features: subscriptionPlan.features,
                isDeleted: subscriptionPlan.isDeleted,
                isActive: subscriptionPlan.isActive,
                cancelledAt: subscriptionPlan.cancelledAt,
                startedAt: subscriptionPlan.startedAt,
                expiredAt: subscriptionPlan.expiredAt,
                payment: subscriptionPlan.payment,
            }
        }, "Updated subscriptionPlan successfully."))

    } catch (error) {
        next(error)
    }
}

export const getSubscriptionPlan = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const subscriptionPlanId = req.params?.subscriptionPlanId ?? req.query?.subscriptionPlanId

    if (!subscriptionPlanId) {
        return next(new ApiError(400, "SubscriptionPlan Id is required."))
    }

    try {
        const subscriptionPlan = await SubscriptionPlan.findOne({
            _id: subscriptionPlanId,
            user: user._id
        })

        if (!subscriptionPlan) {
            return next(new ApiError(400, "SubscriptionPlan not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            subscriptionPlan: {
                id: subscriptionPlan.id,
                title: subscriptionPlan.title,
                description: subscriptionPlan.description,
                content: subscriptionPlan.content,
                note: subscriptionPlan.note,
                price: subscriptionPlan.price,
                duration: subscriptionPlan.duration,
                renewalType: subscriptionPlan.renewalType,
                features: subscriptionPlan.features,
                isDeleted: subscriptionPlan.isDeleted,
                isActive: subscriptionPlan.isActive,
                cancelledAt: subscriptionPlan.cancelledAt,
                startedAt: subscriptionPlan.startedAt,
                expiredAt: subscriptionPlan.expiredAt,
                payment: subscriptionPlan.payment,
            }
        }, "Fetched subscriptionPlan  successfully."))

    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptionPlans = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const subscriptionPlans = await SubscriptionPlan.find({
            user: user._id
        }).select("  title description content note price duration renewalType features isDeleted isActive cancelledAt startedAt expiredAt")

        if (!subscriptionPlans.length) {
            return next(new ApiError(404, "SubscriptionPlan(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, subscriptionPlans, "Fetched subscriptionPlan(s) successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteSubscriptionPlan = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const subscriptionPlanId = req.params?.subscriptionPlanId ?? req.query?.subscriptionPlanId

    if (!subscriptionPlanId) {
        return next(new ApiError(400, "SubscriptionPlan Id is required."))
    }

    try {
        const subscriptionPlan = await SubscriptionPlan.findOneAndUpdate(
            { _id: subscriptionPlanId, user: user._id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        if (!subscriptionPlan) {
            return next(new ApiError(400, "SubscriptionPlan not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            subscriptionPlan: {
                id: subscriptionPlan._id,
                title: subscriptionPlan.title,
                price: subscriptionPlan.price,
                duration: subscriptionPlan.duration,
                renewalType: subscriptionPlan.renewalType,
                startedAt: subscriptionPlan.startedAt,
                expiredAt: subscriptionPlan.expiredAt,
                isActive: subscriptionPlan.isActive,
                cancelledAt: subscriptionPlan.cancelledAt,
                isDeleted: subscriptionPlan.isDeleted
            }
        }, "Deleted subscriptionPlan successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteAllSubscriptionPlans = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const subscriptionPlans = await SubscriptionPlan.updateMany(
            { user: user._id },
            { $set: { isDeleted: true } }
        )

        if (!subscriptionPlans) {
            return next(new ApiError(404, "SubscriptionPlan(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, subscriptionPlans, "Deleted subscriptionPlan(s) successfully."))

    } catch (error) {
        next(error)
    }
}