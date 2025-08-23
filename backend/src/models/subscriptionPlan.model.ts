import mongoose, { Schema, Model, Document, Query } from "mongoose"

export interface ISubscriptionPlan extends Document {
    title: string,
    description: string,
    content?: string,
    note?: string,
    price: string,
    duration: string,
    renewalType: "manual" | "auto";
    features: string[],
    isDeleted: boolean,
    isActive: boolean,
    cancelledAt: Date,
    startedAt: Date,
    expiredAt: Date,
    payment: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
}

const subscriptionPlanSchema: Schema<ISubscriptionPlan> = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        enum: ["Basic", "Pro", "Premium"]
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        required: true,
    },
    note: {
        type: String,

    },
    isActive: {
        type: Boolean,
        default: false
    },
    startedAt: {
        type: Date,
    },
    expiredAt: {
        type: Date
    },
    content: {
        type: String,
        trim: true
    },
    duration: {
        type: String
    },
    renewalType: {
        type: String,
        enum: ["manual", "auto"]
    },
    cancelledAt: {
        type: Date
    },
    features: [{
        type: String
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})

subscriptionPlanSchema.pre<Query<any, any>>(/^find/, function (next) {
    this.where({ isDeleted: false });
    next()
})

export const SubscriptionPlan: Model<ISubscriptionPlan> = mongoose.model<ISubscriptionPlan>("Subscription", subscriptionPlanSchema) 