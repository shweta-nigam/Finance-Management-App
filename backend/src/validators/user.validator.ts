import { z } from "zod"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

export const registerUserSchema = z.object({
    name: z.string().min(2, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters").optional(),
    email: z.email("Invalid email formate"),
    password: z.string().regex(passwordRegex, "Password must contain uppercase, lowercase, number, and special character"),
    role: z.enum(["User", "Admin"]).optional(),
    isPlanActive: z.boolean().optional(),
    avatar: z.preprocess(
        (val) => {
            if (typeof val !== "string") return undefined;
            const clean = val.trim().toLowerCase();

            if (clean === "" || clean === "null" || clean === "undefined") {
                return undefined;
            }

            return val;
        },
        z.string().regex(/^https?:\/\/.+/i, "Invalid URL").optional()
    ),
})

export const loginUserSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password is required"),
});

export const googleUserSchema = z.object({
    sub: z.string(), // Google unique user ID
    email: z.email(),
    email_verified: z.boolean(),
    name: z.string().optional(),
    picture: z.url().optional(),
});

export const updateUserSchema = registerUserSchema.partial()