import type { IIncome } from "../models/income.model";

export type IncomeResponse = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency?: string;
  date?: string;
  note?: string;
  source?: string;
  paymentMethod?: string;
  isRecurring?: boolean;
  frequency?: string;
  isDeleted?: boolean;
  categoryId?: string;
};

export function toIncomeResponse(income: IIncome): IncomeResponse;
export function toIncomeResponse(incomes: IIncome[]): IncomeResponse[];
export function toIncomeResponse(
  incomeOrIncomes: IIncome | IIncome[]
): IncomeResponse | IncomeResponse[] {
  if (Array.isArray(incomeOrIncomes)) {
    return incomeOrIncomes.map((i) => toIncomeResponse(i));
  }

  const income = incomeOrIncomes;
  const id = (income as any).id ?? String((income as any)._id ?? "");
  const date = income.date ? new Date(income.date).toISOString() : undefined;

  return {
    id,
    title: income.title,
    description: income.description,
    amount: income.amount,
    currency: income.currency,
    date,
    note: income.note,
    source: (income as any).source ?? undefined,
    paymentMethod: (income as any).paymentMethod ?? undefined,
    isRecurring: !!(income as any).isRecurring,
    frequency: (income as any).frequency ?? undefined,
    isDeleted: !!(income as any).isDeleted,
  };
}
