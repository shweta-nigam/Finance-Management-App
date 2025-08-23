import { boolean, z } from "zod"

export const paymentCreateSchema = z.object({
    amount: z.number(),
    date: z.coerce.date(),
    currency: z.string().min(1, "Currency is required"),
    status: z.enum(["Pending", "Completed", "Failed"]),
    paymentMethod: z.enum(["Card", "UPI", "Bank Transfer"]),
    receiptUrl: z.string().min(1, "receipt url is required"),
    paymentId: z.string("Payment Id is required"),
    orderId: z.string("order Id is required"),
    signature: z.string("Signature is required"),
    isVerified: boolean().optional(),
    isDeleted: boolean().optional(),
})

export const paymentUpdateSchema = paymentCreateSchema.partial();

