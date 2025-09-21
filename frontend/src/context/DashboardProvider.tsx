import type { ReactNode } from "react";
import { BudgetProvider } from "./BudgetContext";
import { ExpenseProvider } from "./ExpenseContext";
import { CategoryProvider } from "./CategoryContext";

export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <CategoryProvider>
            {children}
        </CategoryProvider>
      </ExpenseProvider>
    </BudgetProvider>
  );
}
