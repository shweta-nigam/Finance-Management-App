import type { IExpense } from "../models/expense.model";

export type ExpenseResponse = {
    id: string;
    title: string;
    description?: string
    amount: number
    date?: string
    note?: string
    currency: string
    receiptUrl?: string
    location?: string
    tags?: string[]
    isDeleted?: boolean
    isRecurring?: boolean
    paymentMethod: string
    frequency?: string
    categoryId?: string
}

export function toExpenseResponse(expense: IExpense): ExpenseResponse;
export function toExpenseResponse(expense: IExpense[]): ExpenseResponse[];
export function toExpenseResponse(expenseOrExpenses: IExpense | IExpense[]): ExpenseResponse | ExpenseResponse[] {

    if (Array.isArray(expenseOrExpenses)) {
        return expenseOrExpenses.map((e) => toExpenseResponse(e))
    }

    const expense = expenseOrExpenses;
    const id = (expense as any).id ?? String((expense as any)._id ?? "")
    const date = expense.date ? new Date(expense.date).toISOString() : undefined;

    return {
        id,
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        date,
        note: expense.note,
        currency: expense.currency,
        receiptUrl: expense.receiptUrl,
        location: expense.location,
        tags: expense.tags,
        isDeleted: expense.isDeleted,
        isRecurring: expense.isRecurring,
        paymentMethod: expense.paymentMethod,
        frequency: expense.frequency,
        categoryId: expense.category ? String(expense.category) : undefined
    }
}
