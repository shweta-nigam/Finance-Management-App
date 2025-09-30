// src/types/finance.ts
export type PaymentMethod = "Cash" | "Card" | "UPI" | "Bank Transfer";

export type Expense = {
  id: string;
  title: string;
  description: string;
  amount: number | "";
  currency: string;
  categoryId: string;
  paymentMethod: PaymentMethod;
  isRecurring: boolean;
  tags: string[];
  date: string; // ISO string
};

export type Category = {
  id: string;
  title: string;
  description?: string;
  note?: string;
  type?: string;
  icon?: string;
  color?: string;
  isDefault?: boolean;
};

export type Budget = {
  id: string;
  categoryId: string;
  limit: number;
  amount: number;
  currency: string;
  frequency?: string | number;
  date: Date | string;      // optional
  title: string;
  perDay?: number;
  spent?: number;
  remaining?: number;
  description?: string;
  createdAt?: string;        // optional
  updatedAt?: string;
  isRecurring?: boolean
};
