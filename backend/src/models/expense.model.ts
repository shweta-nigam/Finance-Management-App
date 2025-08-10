import mongoose, { Schema, Model, Document } from "mongoose"

export interface IExpense extends Document {
    title: string,
    description: string,
    amount: number,
    date: Date,
    note?: string,
    currency: string,
    paymentMethod: "Cash" | "Card" | "UPI" | "Bank Transfer";
    isRecurring: boolean,
    frequency?: "Daily" | "Weekly" | "Monthly" | "Yearly";
    receiptUrl: string,
    location: string,
    tags: string[],
    user: mongoose.Types.ObjectId,
    category?: mongoose.Types.ObjectId,
    budget?: mongoose.Types.ObjectId,
}

const expenseSchema: Schema<IExpense> = new Schema({
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
    isRecurring: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "UPI", "Bank Transfer"],
    },
    receiptUrl: {
        type: String,
        trim:true
    },
    tags: [{
        type: String,
        trim: true
    }],
    location: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    budget: {
        type: Schema.Types.ObjectId,
        //   ref:"Budget"
    },
    category: {
        type: Schema.Types.ObjectId,
        //   ref:"Category"
    }
},{
    timestamps:true
})

export const Expense: Model<IExpense> = mongoose.model<IExpense>("Expense", expenseSchema)