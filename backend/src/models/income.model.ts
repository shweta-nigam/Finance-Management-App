import mongoose, { Schema, Model, Document, Query } from "mongoose";

export interface IIncome extends Document {
  title: string;
  description?: string;
  amount: number;
  date?: Date;
  note?: string;
  currency: string;
  source?: string;
  paymentMethod: "Cash" | "Card" | "UPI" | "Bank Transfer";
  isRecurring?: boolean;
  frequency?: "Daily" | "Weekly" | "Monthly" | "Yearly";
  isDeleted?: boolean;
  user: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId; 
}

const incomeSchema: Schema<IIncome> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    source: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

incomeSchema.pre<Query<any, any>>(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

export const Income: Model<IIncome> = mongoose.model<IIncome>(
  "Income",
  incomeSchema
);
