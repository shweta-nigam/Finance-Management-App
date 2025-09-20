import { createContext, useContext, useState, type ReactNode } from "react";

type Expense = {
  id: string;
  amount: number;
  date: Date;
  frequency: string[];
};

type ExpenseContextType = {
  expense: Expense | null;
  addExpense: (expense: Expense) => void;
  clearExpense: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  // destructure from {props.children}
  const [expense, setExpense] = useState<Expense | null>(null);

  const addExpense = (newExpense: Expense) => {
    setExpense(newExpense);
  };

  const clearExpense = () => {
    setExpense(null);
  };

  return (
    <ExpenseContext.Provider value={{ expense, addExpense, clearExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export default function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider ");
  }
  return context;
}
