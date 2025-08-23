import mongoose, { Schema, Model, Document, Query } from "mongoose"

export interface ICategory extends Document {
    title: string,
    description: string,
    note?: string,
    type: "Income" | "Expense";
    icon?: string,
    color?: string,
    isDeleted: boolean,
    isDefault: boolean,                      //Mark if it's an app-provided default category
    user: Schema.Types.ObjectId,
    budget: Schema.Types.ObjectId,
}

const categorySchema: Schema<ICategory> = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ["Income", "Expense"]
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: "Budget"
    }
}, {
    timestamps: true
})

categorySchema.pre<Query<any, any>>(/^find/, function (next) {
    this.where({ isDeleted: false });
    next()
})

export const Category: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema)