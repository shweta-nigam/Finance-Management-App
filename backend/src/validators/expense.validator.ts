
import { z } from "zod"

export const expenseCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is Required"),
    amount: z.number(),
    date: z.coerce.date(),
    note: z.string().optional(),
    currency: z.string(),
    paymentMethod: z.enum(["Cash", "Card", "UPI", "Bank Transfer"]),
    isRecurring: z.boolean(),
    frequency: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]).optional(),
    receiptUrl: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string().max(10, "Too many tags").optional()),
    isDeleted: z.boolean().optional(),
})

export const expenseUpdateSChema = expenseCreateSchema.partial();