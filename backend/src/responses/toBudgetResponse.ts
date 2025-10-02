import type { IBudget } from "../models/budget.model";

export type BudgetResponse = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency?: string;
  date?: string;
  isRecurring?: boolean;
  frequency?: string;
  isDeleted?: boolean;
};


export function toBudgetResponse(budget: IBudget): BudgetResponse;  // type declarations for the same function.
export function toBudgetResponse(budgets: IBudget[]): BudgetResponse[]; // type declarations for the same function.
export function toBudgetResponse(budgetOrBudgets: IBudget | IBudget[]): BudgetResponse | BudgetResponse[] {
  
  if (Array.isArray(budgetOrBudgets)) {
    return budgetOrBudgets.map((b) => toBudgetResponse(b));
  }

  const budget = budgetOrBudgets;
  const id = (budget as any).id ?? String((budget as any)._id ?? "");
  const date = budget.date ? new Date(budget.date).toISOString() : undefined;

  return {
    id,
    title: budget.title,
    description: budget.description,
    amount: budget.amount,
    currency: budget.currency,
    date,
    isRecurring: !!(budget as any).isRecurring,
    frequency: (budget as any).frequency ?? undefined,
    isDeleted: !!(budget as any).isDeleted,
  };
}

// notes:
// recursion = a function solving a big problem by breaking it into smaller versions of the same problem, until it’s simple enough.