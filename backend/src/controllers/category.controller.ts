import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { categoryCreateSchema, categoryUpdateSchema } from "../validators/category.validator";
import { Category } from "../models/category.model";
import { toCategoryResponse } from "../responses/toCategoryResponse";



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


        res.status(201).json(new ApiResponse(201, { category: toCategoryResponse(category) }, "Created category successfully!"))

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


        res.status(200).json(new ApiResponse(200, { category: toCategoryResponse(category) }, "Updated category successfully."))

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
            return next(new ApiError(404, "Category not found"))
        }


        return res.status(200).json(new ApiResponse(200, { category: toCategoryResponse(category) }, "Fetched category successfully."))

    } catch (error) {
        next(error)
    }
}

export const getAllCategories = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const categories = await Category.find({
            user: user._id
        }).select("title description note type icon color isDefault")

        if (!categories.length) {
            return res.status(200).json(new ApiResponse(200, [], "No categories found"))
        }

        res.status(200).json(new ApiResponse(200, { categories: toCategoryResponse(categories) }, "Fetched categories successfully."))

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


        res.status(200).json(new ApiResponse(200, { category: toCategoryResponse(category) }, "Deleted category successfully."))

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

        res.status(200).json(new ApiResponse(200, { categories: toCategoryResponse(categories) }, "Deleted categories successfully."))

    } catch (error) {
        next(error)
    }
}