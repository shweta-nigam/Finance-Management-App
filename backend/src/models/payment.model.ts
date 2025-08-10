import mongoose, { Schema, Model, Document } from "mongoose"

export interface IPayment extends Document {
    amount: number,
    date: Date,
    currency: string,
    status: "Pending" | "Completed" | "Failed";
    paymentMethod: "Card" | "UPI" | "Bank Transfer";
    receiptUrl: string,
    paymentId:string,
    orderId:string,
    signature:string,
    isVerified:boolean,
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
    status:{ 
        type:String,
        enum:["Pending","Completed","Failed"]
    },
    paymentMethod:{
     type:String,
        enum:["Card", "UPI" ,"Bank Transfer"]
    },
    receiptUrl: {
       type: String,
        trim: true,
        required: true  
    },
    paymentId:{
        type:String,
        trim:true,
        unique:true,
    },
    orderId:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
       user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscriptionPlan: {
        type: Schema.Types.ObjectId,
          ref:"SubscriptionPlan"
    },
},{
    timestamps:true
})

export const Payment :Model<IPayment> = mongoose.model<IPayment>("Payment", paymentSchema)