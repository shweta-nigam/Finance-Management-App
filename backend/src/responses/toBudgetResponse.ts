import type {IBudget } from "../models/budget.model";

export const toBudgetResponse = (budget: IBudget) => ({
  id: budget.id,                
  title: budget.title,
  description: budget.description,
  amount: budget.amount,
  currency: budget.currency,
  date: budget.date,
  isRecurring: budget.isRecurring || false,
  frequency: budget.frequency || "Monthly",
});