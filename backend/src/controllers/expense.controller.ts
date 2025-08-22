import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "./auth.controller";
import { ApiError } from "../utils/apiError";
import { Expense } from "../models/expense.model";
import { ApiResponse } from "../utils/apiResponse";




export const createExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const user = req.user

    // console.log("logged user---------------->>>>> ", user);

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { title, description, amount, date, currency, frequency, paymentMethod, note, tags, location, category, budget, isRecurring } = req.body

    if (!title || !description || !amount || !date || !currency || !paymentMethod) {
        return next(new ApiError(400, "Required fields missing."))
    }

    try {
        const expense = await Expense.create({
            title,
            description,
            amount,
            date,
            currency,
            frequency,
            user: user._id,
            paymentMethod,
            note,
            tags,
            location,
            category,
            budget,
            isRecurring: isRecurring ?? false
        })


        res.status(201).json(new ApiResponse(201, {
            express: {
                id: expense.id,
                title: expense.title,
                description: expense.description,
                amount: expense.amount,
                date: expense.date,
                currency: expense.currency,
                frequency: expense.frequency,
                paymentMethod: expense.paymentMethod,
                note: expense.note,
                tags: expense.tags,
                location: expense.location,
                category: expense.category,
                budget: expense.budget,
                isRecurring: expense.isRecurring
            }
        }, "Created expense successfully!"))

    } catch (error) {
        next(error)
    }
}

export const updateExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    // console.log("logged user----------------> ", user);

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { expenseId } = req.params ?? req.query

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }

    const { title, description, amount, date, currency, frequency, paymentMethod, note, tags, location, category, budget, isRecurring } = req.body

    if (!title && !description && !amount && !date && !currency && !paymentMethod && !frequency && !note && !tags && !location && !category && !budget && !isRecurring) {
        return next(new ApiError(400, "Provide at least one field to update."))
    }

    try {
        const expense = await Expense.findOneAndUpdate({
            _id: expenseId,
            user: user._id
        },
            { $set: { title, description, amount, date, currency, frequency, paymentMethod, note, tags, location, category, budget, isRecurring } },
            { new: true, runValidators: true }
        )


        res.status(200).json(new ApiResponse(200, expense, "Updated expense successfully."))

    } catch (error) {
        next(error)
    }
}

export const getExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    // console.log("logged user----------------> ", user);

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { expenseId } = req.params ?? req.query

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }

    try {
        const expense = await Expense.findOne({
            _id: expenseId,
            user: user._id
        })

        if (!expense) {
            return next(new ApiError(400, "Expense not found"))
        }


        res.status(200).json(new ApiResponse(200, expense, "Fetched expense  successfully."))

    } catch (error) {
        next(error)
    }
}

export const getAllExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    // console.log("logged user----------------> ", user);

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    try {
        const expenses = await Expense.find({
            user: user._id
        }).select(" id title  description amount date currency frequency paymentMethod note tags location category budget isRecurring ")

        if (!expenses) {
            return next(new ApiError(404, "Expense(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, expenses, "Fetched expense(s) successfully."))

    } catch (error) {
        next(error)
    }
}

export const deleteExpense = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user

    // console.log("logged user----------------> ", user);

    if (!user) {
        return next(new ApiError(401, "Unauthorized"))
    }

    const { expenseId } = req.params ?? req.query

    if (!expenseId) {
        return next(new ApiError(400, "Expense Id is required."))
    }

    try {
        const expense = await Expense.findOneAndDelete({
            _id: expenseId,
            user: user._id
        })

        if (!expense) {
            return next(new ApiError(400, "Expense not found"))
        }


        res.status(200).json(new ApiResponse(200, {
            expense: {
                id: expense._id,
                title: expense.title,
                amount: expense.amount,
                date: expense.date,
                currency: expense.currency,
                paymentMethod: expense.paymentMethod
            }
        }, "Deleted expense successfully."))

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
        const expenses = await Expense.updateMany(
            { user: user._id },
            { $Set: { isDeleted: true } }
        )

        if (!expenses) {
            return next(new ApiError(404, "Expense(s) not found"))
        }

        res.status(200).json(new ApiResponse(200, expenses, "Deleted expense(s) successfully."))

    } catch (error) {
        next(error)
    }
}