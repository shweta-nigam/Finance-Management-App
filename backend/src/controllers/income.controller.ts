import { NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { Income, IIncome } from "../models/income.model";
import { incomeCreateSchema, incomeUpdateSchema } from "../validators/income.validator";
import { toIncomeResponse } from "../responses/toIncomeResponse";

/**
 * @desc Create a new income
 */
export const createIncome = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    const validatedData = incomeCreateSchema.parse(req.body);

    try {
        const income = await Income.create({
            ...validatedData,
            user: user._id,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    { income: toIncomeResponse(income) },
                    "Income created successfully!"
                )
            );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @desc Update existing income
 */
export const updateIncome = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;
    const incomeId = req.params.incomeId ?? req.query.incomeId;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    if (!incomeId) {
        return next(new ApiError(400, "Income id is required"));
    }

    const validatedData = incomeUpdateSchema.parse(req.body);

    try {
        const income = await Income.findOneAndUpdate(
            { _id: incomeId, user: user._id },
            { $set: validatedData },
            { new: true, runValidators: true }
        );

        if (!income) {
            return next(new ApiError(404, "Income not found"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { income: toIncomeResponse(income) },
                    "Income updated successfully"
                )
            );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * @desc Get all incomes for the logged-in user
 */
export const getAllIncomes = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    try {
        const incomes: IIncome[] = await Income.find({
            user: user._id,
            isDeleted: false,
        })
            .select("id title amount currency date paymentMethod isRecurring frequency")
            .lean<IIncome[]>();

        if (incomes.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, { incomes: [] }, "No incomes yet"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { incomes: toIncomeResponse(incomes) },
                    "Fetched incomes successfully!"
                )
            );
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get single income by ID
 */
export const getIncomeById = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;
    const incomeId = req.params.incomeId ?? req.query.incomeId;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    if (incomeId) {
        return next(new ApiError(400, "incomeId is required"))
    }

    try {
        const income = await Income.findOne({
            _id: incomeId,
            user: user._id,
            isDeleted: false,
        }).select(
            "id title description amount currency date note paymentMethod source isRecurring frequency"
        );

        if (!income) {
            return next(new ApiError(404, "Income not found."));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { income: toIncomeResponse(income) },
                    "Income found successfully!"
                )
            );
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Soft delete a single income
 */
export const deleteIncome = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;
    const incomeId = req.params.incomeId ?? req.query.incomeId;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    if (incomeId) {
        return next(new ApiError(400, "incomeId is required"))
    }

    try {
        const income = await Income.findOneAndUpdate(
            { _id: incomeId, user: user._id, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true }
        ).lean<IIncome>();

        if (!income) {
            return next(new ApiError(404, "Income not found."));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { income: toIncomeResponse(income) },
                    "Income deleted successfully!"
                )
            );
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Soft delete all incomes for the user
 */
export const deleteAllIncomes = async (req: any, res: any, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        return next(new ApiError(404, "User not found."));
    }

    try {
        await Income.updateMany(
            { user: user._id, isDeleted: false },
            { $set: { isDeleted: true } }
        );

        const deletedIncomes: IIncome[] = await Income.find({
            user: user._id,
            isDeleted: true,
        })
            .select("id title amount currency date paymentMethod")
            .lean<IIncome[]>();

        if (deletedIncomes.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(200, { incomes: [] }, "No incomes to delete."));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { incomes: toIncomeResponse(deletedIncomes) },
                    "All incomes deleted successfully!"
                )
            );
    } catch (error) {
        next(error);
    }
};
