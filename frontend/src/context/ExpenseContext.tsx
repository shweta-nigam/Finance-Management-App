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
  addExpense: (expense: Omit<Expense, "id">) => Promise<Expense>;
  clearExpense: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType | undefined>(
  undefined
);

export function ExpenseProvider({ children }: { children: ReactNode }) {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { response, getAllExpenses, createExpense } = useExpenseApi();

  // fetch all expenses on mount and save directly to state
  useEffect(() => {
    (async() => {
      try {
        const all =  await getAllExpenses("/api/v1/expense/");
        setExpenses(all)
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    })()
  
  }, []);

  useEffect(() => {
    if (response) {
      console.log(
        "Expense API response:(from expense context code file",
        response
      );
      if (Array.isArray(response)) {
        setExpenses(response);
      } else if (typeof response === "object") {
        // add single object
        setExpenses((prev) => {
          const exists = prev.find((e) => e.id === (response as Expense).id);
          if (exists) {
            return prev.map((e) =>
              e.id === (response as Expense).id ? (response as Expense) : e
            );
          }
          return [response as Expense, ...prev];
        });
      } else {
        console.warn("Expense API returned non-array response:", response);
        setExpenses([]);
      }
    }
  }, [response]);

  const addExpense = async (newExpense: Omit<Expense, "id">) => {
    try {
      console.log("addExpense called with:", newExpense);

      const saved = await createExpense("/api/v1/expense/", newExpense);

      console.log("createExpense returned:", saved);

      setExpenses((prev) => [saved, ...prev]);

      return saved;
    } catch (err) {
      console.error("Failed to add expense(in provider)", err);
      throw err;
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
