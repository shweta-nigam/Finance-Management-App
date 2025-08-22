import {z} from "zod"

export const subscriptionPlanCreateSchema = z.object({
    title:z.enum(["Basic", "Pro", "Premium"]),
    description:z.string().min(1,"Description is required"),
    content:z.string().min(1,"Content is required"),
    note:z.string().optional(),
    price:z.string().min(1,"Price is required"),
    duration:z.string().min(1,"Duration is required"),
    renewalType:z.enum(["manual", "auto" ]),
    features: z.array(z.string()).nonempty("At least one feature is required"),
    isDeleted: z.boolean().optional(),
    isActive:z.boolean().optional(),
    cancelledAt:z.coerce.date().optional(),
    startedAt:z.coerce.date().optional(),
    expiredAt:z.coerce.date().optional(),
})

export const subscriptionPlanUpdateSchema = 
subscriptionPlanCreateSchema.partial(); 