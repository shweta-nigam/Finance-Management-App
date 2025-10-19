import { z } from "zod";

export const incomeCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive({ message: "Amount must be positive" }),
  date: z.coerce.date(),
  currency: z.string().min(1, "Currency is required"),
  note: z.string().optional(),
  source: z.string().optional(),
  paymentMethod: z.enum(["Cash", "Card", "UPI", "Bank Transfer"]),
  isRecurring: z.boolean(),
  frequency: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]).optional(),
  isDeleted: z.boolean().optional(),
  category: z.string().optional(),   
});

export const incomeUpdateSchema = incomeCreateSchema.partial();
