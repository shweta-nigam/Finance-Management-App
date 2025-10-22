import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Income } from "@/types";
import { useIncomeApi } from "@/hooks/useIncomeApi";

type IncomeContextType = {
  incomes: Income[];
  activeIncome: Income | null;
  setActiveIncome: (income: Income | null) => void;
  loading: boolean;
  error: string | null;
  chartData: any[];
  month: string;
  addIncome: (income: Omit<Income, "id">) => Promise<Income>;
  updateIncome: (id: string, updated: Partial<Income>) => Promise<Income>;
  removeIncome: (id: string) => Promise<void>;
  removeAllIncomes: () => Promise<void>;
  clearIncomes: () => void;
};

export const IncomeContext = createContext<IncomeContextType | undefined>(
  undefined
);

export function IncomeProvider({ children }: { children: ReactNode }) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIncome, setActiveIncome] = useState<Income | null>(null);

  const {
    getAllIncomes,
    createIncome,
    updateIncome,
    deleteIncome,
    deleteAllIncomes,
    chartData,
    month,
  } = useIncomeApi();

  // Load initial incomes
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllIncomes("/api/v1/income");
        if (data && data.length > 0) setActiveIncome(data[0]);
        setIncomes(data);
      } catch (err: any) {
        setError("Failed to fetch incomes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Add new income
  const addIncome = async (newIncome: Omit<Income, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const saved = await createIncome("/api/v1/income", newIncome);
      setIncomes((prev) => [...prev, saved]);
      return saved;
    } catch (err: any) {
      setError("Failed to add income");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update existing income
  const updateIncomeById = async (id: string, updated: Partial<Income>) => {
    setLoading(true);
    setError(null);
    try {
      const saved = await updateIncome(`/api/v1/income/${id}`, updated);
      setIncomes((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...saved } : i))
      );
      return saved;
    } catch (err: any) {
      setError("Failed to update income");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete single income
  const removeIncome = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteIncome(`/api/v1/income/${id}`);
      setIncomes((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      setError("Failed to delete income");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete all incomes
  const removeAllIncomes = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteAllIncomes("/api/v1/income");
      setIncomes([]);
    } catch (err: any) {
      setError("Failed to delete all incomes");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear incomes locally
  const clearIncomes = () => {
    setIncomes([]);
  };

  const value = useMemo(
    () => ({
      incomes,
      activeIncome,
      setActiveIncome,
      loading,
      error,
      chartData,
      month,
      addIncome,
      updateIncome: updateIncomeById,
      removeIncome,
      removeAllIncomes,
      clearIncomes,
    }),
    [incomes, loading, error, chartData, month]
  );

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
}

export default function useIncome() {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncome must be used within an IncomeProvider");
  }
  return context;
}
