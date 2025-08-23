import { z } from "zod"

export const categoryCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    note: z.string().optional(),
    type: z.enum(["Income", "Expense"]),
    icon: z.string().optional(),
    color: z.string().optional(),
    isDeleted: z.boolean().optional(),
    isDefault: z.boolean().optional()
})

export const categoryUpdateSchema = categoryCreateSchema.partial();