import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { categoryCreateSchema, categoryUpdateSchema } from "../validators/category.validator";
import { Category } from "../models/category.model";



export const createCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }
    try {

        const validatedData = categoryCreateSchema.parse(req.body)

        const category = await Category.create({
            ...validatedData,
            user: user._id
        })


        res.status(201).json(new ApiResponse(201, {
            category: {
                id: category.id,
                title: category.title,
                description: category.description,
                type: category.type,
                note: category.note,
                icon: category.icon,
                color: category.color,
                isDefault: category.isDefault
            }
        }, "Created category successfully!"))

    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { categoryId } = req.params ?? req.query

    if (!categoryId) {
        return next(new ApiError(400, "category Id is required."))
    }

    try {

        const validatedData = categoryUpdateSchema.parse(req.body)

        const category = await Category.findOneAndUpdate(
            { _id: categoryId, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        )

        if (!category) {
            return next(new ApiError(404, "Category not found"));
        }


        res.status(200).json(new ApiResponse(200, {
            category: {
                id: category.id,
                title: category.title,
                description: category.description,
                type: category.type,
                note: category.note,
                icon: category.icon,
                color: category.color,
                isDefault: category.isDefault
            }
        }, "Updated category successfully."))

    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { categoryId } = req.params ?? req.query

    if (!categoryId) {
        return next(new ApiError(400, "Category Id is required."))
    }

    try {
        const category = await Category.findOne({
            _id: categoryId,
            user: user._id
        })

        if (!category) {
            return next(new ApiError(400, "Category not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            category: {
                id: category.id,
                title: category.title,
                description: category.description,
                type: category.type,
                note: category.note,
                icon: category.icon,
                color: category.color,
                isDefault: category.isDefault
            }
        }, "Fetched category  successfully."))

    } catch (error) {
        next(error)
    }
}

export const getAllCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const categories = await Category.find({
            user: user._id
        }).select("title description note type icon color isDefault")

        if (!categories.length) {
            return next(new ApiError(404, "Categories not found"))
        }

        res.status(200).json(new ApiResponse(200, categories, "Fetched categories successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { categoryId } = req.params ?? req.query

    if (!categoryId) {
        return next(new ApiError(400, "Category Id is required."))
    }

    try {
        const category = await Category.findOneAndUpdate(
            { _id: categoryId, user: user._id },
            { $set: { isDeleted: true } },
            { new: true }
        )

        if (!category) {
            return next(new ApiError(400, "Category not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            category: {
                id: category.id,
                title: category.title,
                description: category.description,
                type: category.type,
                note: category.note,
                icon: category.icon,
                color: category.color,
                isDefault: category.isDefault
            }
        }, "Deleted category successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteAllCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const categories = await Category.updateMany(
            { user: user._id },
            { $set: { isDeleted: true } }
        )

        if (!categories) {
            return next(new ApiError(404, "Categories not found"))
        }

        res.status(200).json(new ApiResponse(200, categories, "Deleted categories successfully."))

    } catch (error) {
        next(error)
    }
}