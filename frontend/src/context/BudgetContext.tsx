import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Budget } from "@/types";
import { useBudgetApi } from "@/hooks/useBudgetApi";

type BudgetContextType = {
  budget: Budget | null;
  addBudget: (budget: Budget)=> Promise<Budget>;
  clearBudget:() => void
};

export const BudgetContext = createContext<BudgetContextType | undefined>(
  undefined
);


export function BudgetProvider({children}: {children: ReactNode }) {
  const [budget, setBudget] = useState<Budget | null>(null);
const { getBudget,  createBudget} = useBudgetApi()

useEffect(()=>{
(async()=>{
try {
  const budget = await getBudget("/api/v1/budget/")
} catch (error) {
  console.error("Failed to fetch budget:", error);
}
})()
}, [])
// Load initial budget
  useEffect(() => {
    (async () => {
      try {
        const data = await getBudget("/api/v1/budget/");
        setBudget(data);
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    })();
  }, [getBudget]);

const addBudget = async (newBudget:Budget) => {
  try {
    const saved = await createBudget("/api/v1/budget", newBudget)
    setBudget(saved)
    return saved
  } catch (err) {
    console.error("Failed to add budget(in provider)", err);
      throw err;
  }
}

const clearBudget = ()=>{
    setBudget(null)
}
  return (
    <BudgetContext.Provider value={{ budget, addBudget, clearBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export default function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be used within an BudgetProvider ");
  }
  return context;
}
