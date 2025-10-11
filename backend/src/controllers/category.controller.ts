import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { categoryCreateSchema, categoryUpdateSchema } from "../validators/category.validator";
import { Category, ICategory } from "../models/category.model";
import { toCategoryResponse } from "../responses/toCategoryResponse";
import mongoose from "mongoose";

const BASE_SELECT = "_id title description note type icon color date isDefault isDeleted";

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

        // Convert to plain object for stable mapping
        const categoryObj = (category as any).toObject ? (category as any).toObject() : category;

        res.status(201).json(new ApiResponse(201, { category: toCategoryResponse(categoryObj) }, "Created category successfully!"))

    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const categoryId = req.params?.categoryId ?? req.query?.categoryId;

    if (!categoryId) {
        return next(new ApiError(400, "category Id is required."))
    }
    if (!mongoose.Types.ObjectId.isValid(String(categoryId))) return next(new ApiError(400, "Invalid Category Id."));

    try {

        const validatedData = categoryUpdateSchema.parse(req.body)

        const category = await Category.findOneAndUpdate(
            { _id: categoryId, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        )
            .select(BASE_SELECT)
            .lean<ICategory | null>();

        if (!category) {
            return next(new ApiError(404, "Category not found"));
        }


        return res.status(200).json(
            new ApiResponse(
                200, { category: toCategoryResponse(category) },
                "Updated category successfully."
            )
        )

    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const categoryId = req.params?.categoryId ?? req.query?.categoryId;

    if (!categoryId) {
        return next(new ApiError(400, "Category Id is required."))
    }
    if (!mongoose.Types.ObjectId.isValid(String(categoryId))) return next(new ApiError(400, "Invalid Category Id."));

    try {
        const category = await Category.findOne({
            _id: categoryId,
            user: user._id,
            isDeleted: false
        })
            .select(BASE_SELECT)
            .lean<ICategory | null>();


        if (!category) {
            return next(new ApiError(404, "Category not found"))
        }


        return res.status(200).json(
            new ApiResponse(
                200,
                { category: toCategoryResponse(category) },
                "Fetched category successfully."
            )
        )

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
        const categories: ICategory[] = await Category.find({
            user: user._id
        })
            .select(BASE_SELECT)
            .lean<ICategory[]>()

        if (categories.length === 0) {
            return res.status(200).json(
                new ApiResponse(200,
                    { categories: [] },
                    "No categories yet"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                { categories: toCategoryResponse(categories) },
                "Fetched categories successfully!"
            )
        )

    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const categoryId = req.params?.categoryId ?? req.query?.categoryId;

    if (!categoryId) {
        return next(new ApiError(400, "Category Id is required."))
    }
    if (!mongoose.Types.ObjectId.isValid(String(categoryId))) return next(new ApiError(400, "Invalid Category Id."));

    try {
        const category = await Category.findOneAndUpdate(
            { _id: categoryId, user: user._id },
            { $set: { isDeleted: true } },
            { new: true }
        )
            .select(BASE_SELECT)
            .lean<ICategory | null>();

        if (!category) {
            return next(new ApiError(404, "Category not found"))
        }


        res.status(200).json(new ApiResponse(200, { category: toCategoryResponse(category) }, "Deleted category successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteAllCategories = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const result = await Category.updateMany(
            { user: user._id, isDeleted: false },
            { $set: { isDeleted: true } }
        )

        const deletedCategories: ICategory[] = await Category.find({ user: user._id, isDeleted: true })
            .select(BASE_SELECT).lean<ICategory[]>()

        if (deletedCategories.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, { categories: [] }, "No categories to delete."));
        }


        res.status(200).json(new ApiResponse(200, { categories: toCategoryResponse(deletedCategories) }, "All categories deleted successfully!"))

    } catch (error) {
        next(error)
    }
}