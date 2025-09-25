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
    (async () => {
      try {
        const all = await getAllExpenses("/api/v1/expense/");
        if (Array.isArray(all)) setExpenses(all);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    })();
  }, []);

useEffect(() => {
  if (!response) return;

  console.log("Expense API response (from context):", response);

  if (Array.isArray(response)) {
    // overwrite with fresh list
    setExpenses(response);
  } else if (typeof response === "object") {
    // merge a single expense object
    setExpenses((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      const exists = prevArr.find((e) => e.id === (response as Expense).id);
      if (exists) {
        return prevArr.map((e) =>
          e.id === (response as Expense).id ? (response as Expense) : e
        );
      }
      return [response as Expense, ...prevArr];
    });
  } else {
    console.warn("Expense API returned unexpected response:", response);
  }
}, [response]);


  const addExpense = async (newExpense: Omit<Expense, "id">) => {
    try {
      console.log("addExpense called with:", newExpense);

      const saved = await createExpense("/api/v1/expense/", newExpense);

      console.log("createExpense returned:", saved);

      setExpenses((prev) => {
        const prevArr = Array.isArray(prev) ? prev : [];
        return [saved, ...prevArr];
      });

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
