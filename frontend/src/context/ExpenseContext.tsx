import { useExpenseApi } from "@/hooks/useExpenseApi";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Expense } from "@/types";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  clearExpense: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { response, getAllExpenses, createExpense } = useExpenseApi();

  useEffect(() => {
    getAllExpenses("/api/v1/expense/");
  }, []);

  useEffect(() => {
    if (response) {
       console.log("Expense API response:(from expense context code file", response);
      if (Array.isArray(response)) {
        setExpenses(response);
      } else {
        console.warn("Expense API returned non-array response:", response);
        setExpenses([]);
      }
    }
  }, [response]);

  const addExpense = async (newExpense: Omit<Expense, "id">) => {
    try {
      const saved = await createExpense("/api/v1/expense/", newExpense);

      setExpenses((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const clearExpense = () => {
    setExpenses([]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, clearExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export default function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
}
