import mongoose, { Schema, Model, Document } from "mongoose"
import { User } from "./user.model"

export interface IBudget extends Document {
    title: string,
    description: string,
    amount: number,
    date: Date,
    isRecurring: boolean,
    frequency?: "Daily" | "Weekly" | "Monthly" | "Yearly";
    note?: string,
    currency: string,
    user: mongoose.Types.ObjectId,
    expense?: mongoose.Types.ObjectId,
    category?: mongoose.Types.ObjectId,
}

const budgetSchema: Schema<IBudget> = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String,
        required: true,
    },
    note: {
        type: String,

    },
    frequency: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "Yearly"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expense: {
        type: Schema.Types.ObjectId,
        //   ref:"Expense"
    },
    category: {
        type: Schema.Types.ObjectId,
        //   ref:"Category"
    }
},
    { timestamps: true }
)

export const Budget: Model<IBudget> = mongoose.model<IBudget>("Budget", budgetSchema)