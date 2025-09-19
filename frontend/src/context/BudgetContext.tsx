import { createContext, useContext, useState, type ReactNode } from "react";
type Budget = {
  id: string;
  amount: number;
  date: Date;
  frequency: string[];
};

type BudgetContextType = {
  budget: Budget | null;
  addBudget: (budget: Budget)=> void;
  clearBudget:() => void
};

export const BudgetContext = createContext<BudgetContextType | undefined>(
  undefined
);


export function BudgetProvider({children}: {children: ReactNode }) {
  const [budget, setBudget] = useState<Budget | null>(null);

const addBudget = (newBudget:Budget) => {
    setBudget(newBudget)
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
