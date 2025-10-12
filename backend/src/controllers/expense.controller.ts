import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { Expense } from "../models/expense.model";
import { ApiResponse } from "../utils/apiResponse";
import { expenseCreateSchema, expenseUpdateSChema } from "../validators/expense.validator";
import { toExpenseResponse } from "../responses/toExpenseResponse";
import mongoose from "mongoose";
import type { IExpense } from "../models/expense.model";
const BASE_SELECT = "_id title description amount date note currency paymentMethod isRecurring frequency receiptUrl location tags isDeleted"


export const createExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const validatedData = expenseCreateSchema.parse(req.body)

        const expense = await Expense.create({
            ...validatedData,
            user: user._id
        })


        return res.status(201).json(
            new ApiResponse(
                201,
                { expense: toExpenseResponse(expense) },
                "Created expense successfully!"
            )
        );

    } catch (error) {
        next(error)
    }
}

export const updateExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user
    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const expenseId = req.params?.expenseId ?? req.query?.expenseId;

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }
    if (!mongoose.Types.ObjectId.isValid(String(expenseId))) {
        return next(new ApiError(400, "Invalid expense Id"))
    }

    try {

        const validatedData = expenseUpdateSChema.parse(req.body)

        const expense = await Expense.findOneAndUpdate(
            { _id: expenseId, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        )
            .select(BASE_SELECT)
            .lean<IExpense | null>()

        if (!expense) {
            return next(new ApiError(404, "Expense not found"))
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                { expense: toExpenseResponse(expense) },
                "Updated expense successfully."
            )
        )

    } catch (error) {
        next(error)
    }
}

export const getExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const expenseId = req.params?.expenseId ?? req.query?.expenseId

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }
    if (!mongoose.Types.ObjectId.isValid(String(expenseId))) return next(new ApiError(400, "Invalid expense Id."));

    try {
        const expense = await Expense.findOne({
            _id: expenseId,
            user: user._id
        })

        if (!expense) {
            return next(new ApiError(404, "Expense not found"))
        }


        return res.status(200).json(
            new ApiResponse(
                200, { expense: toExpenseResponse(expense) },
                "Fetched expense successfully."
            )
        )

    } catch (error) {
        next(error)
    }
}

export const getAllExpenses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const expenses = await Expense.find({
            user: user._id
        })
            .select(BASE_SELECT)
            .lean<IExpense[]>()

        if (expenses.length === 0) {
            return res.status(200).json(
                new ApiResponse(200, { expenses: [] }, "No expenses yet.")
            );
        }


        return res.status(200).json(
            new ApiResponse(
                200,
                { expenses: toExpenseResponse(expenses) },
                "Fetched expenses successfully."
            )
        )

    } catch (error) {
        next(error)
    }
}

export const deleteExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const expenseId = req.params?.expenseId ?? req.query?.expenseId

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }

    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: expenseId, user: user._id },
            { isDeleted: true },
            { new: true }
        )
            .select(BASE_SELECT)
            .lean<IExpense | null>()

        if (!expense) {
            return next(new ApiError(404, "Expense not found"))
        }


        return res.status(200).json(
            new ApiResponse(
                200,
                { expense: toExpenseResponse(expense) },
                "Deleted expense successfully."
            )
        )

    } catch (error) {
        next(error)
    }
}

export const deleteAllExpenses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const result = await Expense.updateMany(
            { user: user._id, isDeleted: false },
            { $set: { isDeleted: true } }
        )

        const deletedExpenses: IExpense[] = await Expense.find(
            { user: user._id, isDeleted: true })
            .select(BASE_SELECT)
            .lean<IExpense[]>()

        if (deletedExpenses.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, { expenses: [] }, "No expense to delete."));
        }

        res.status(200).json(new ApiResponse(200, { expenses: toExpenseResponse(deletedExpenses) }, "Deleted expenses successfully."))

    } catch (error) {
        next(error)
    }
}