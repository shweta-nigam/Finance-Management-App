import type { ReactNode } from "react";
import { BudgetProvider } from "./BudgetContext";
import { ExpenseProvider } from "./ExpenseContext";
import { CategoryProvider } from "./CategoryContext";
import { IncomeProvider } from "./IncomeContext";

export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <CategoryProvider>
          <IncomeProvider>
            {children}
          </IncomeProvider>
        </CategoryProvider>
      </ExpenseProvider>
    </BudgetProvider>
  );
}
