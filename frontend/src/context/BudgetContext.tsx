import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Budget } from "@/types";
import { useBudgetApi } from "@/hooks/useBudgetApi";

type BudgetContextType = {
  budgets: Budget[];
  loading: boolean;
  error: string | null;
  addBudget: (budget: Omit<Budget, "id">) => Promise<Budget>;
  updateBudget: (id: string, updated: Partial<Budget>) => Promise<Budget>;
  deleteBudget: (id: string) => Promise<void>;
  clearBudgets: () => void;
};

export const BudgetContext = createContext<BudgetContextType | undefined>(
  undefined
);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getAllBudgets, createBudget, updateBudget, deleteBudget } = useBudgetApi();

  // Load initial budgets
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllBudgets("/api/v1/budget");
        setBudgets(data || []);
        console.log("initial budgets:", data);
      } catch (err: any) {
        setError("Failed to fetch budgets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addBudget = async (newBudget: Omit<Budget, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const saved = await createBudget("/api/v1/budget", newBudget);
      setBudgets((prev) => [...prev, saved]);
      return saved;
    } catch (err: any) {
      setError("Failed to add budget");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBudgetHandler = async (id: string, updated: Partial<Budget>) => {
    setLoading(true);
    setError(null);
    try {
      const saved = await updateBudget(`/api/v1/budget/${id}`, updated);
      setBudgets((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...saved } : b))
      );
      return saved;
    } catch (err: any) {
      setError("Failed to update budget");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBudgetHandler = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBudget(`/api/v1/budget/${id}`);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      setError("Failed to delete budget");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearBudgets = () => {
    setBudgets([]);
  };

  const value = useMemo(
    () => ({
      budgets,
      loading,
      error,
      addBudget,
      updateBudget: updateBudgetHandler,
      deleteBudget: deleteBudgetHandler,
      clearBudgets,
    }),
    [budgets, loading, error]
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

export default function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}

