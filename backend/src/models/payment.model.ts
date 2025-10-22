import mongoose, { Schema, Model, Document, Query } from "mongoose"

export interface IPayment extends Document {
    amount: number,
    date?: Date,
    currency: string,
    status: "Pending" | "Completed" | "Failed";
    paymentMethod: "Card" | "UPI" | "Bank Transfer";
    receiptUrl: string,
    paymentId: string,
    orderId: string,
    signature: string,
    isVerified: boolean,
    isDeleted: boolean,
    user: mongoose.Types.ObjectId,
    subscriptionPlan: Schema.Types.ObjectId,
}

const paymentSchema: Schema<IPayment> = new Schema({
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
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"]
    },
    paymentMethod: {
        type: String,
        enum: ["Card", "UPI", "Bank Transfer"]
    },
    receiptUrl: {
        type: String,
        trim: true,
        required: true
    },
    paymentId: {
        type: String,
        trim: true,
        unique: true,
    },
    orderId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    isVerified: {
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
        ref: "User",
        required: true
    },
    subscriptionPlan: {
        type: Schema.Types.ObjectId,
        ref: "SubscriptionPlan"
    },
}, {
    timestamps: true
})

paymentSchema.pre<Query<any, any>>(/^find/, function (next) {
    this.where({ isDeleted: false });
    next()
})

export const Payment: Model<IPayment> = mongoose.model<IPayment>("Payment", paymentSchema)