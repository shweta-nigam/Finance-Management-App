import { z } from "zod"

export const budgetCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    amount: z.number().positive(),
    date: z.coerce.date(),
    isRecurring: z.boolean(),
    frequency: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]),
    note: z.string().optional(),
    currency: z.string().min(1, "Currency is required"),
    isDeleted: z.boolean().optional(),
    category: z.string().optional(),
    expense: z.string().optional(),
})

export const budgetUpdateSchema = budgetCreateSchema.partial();