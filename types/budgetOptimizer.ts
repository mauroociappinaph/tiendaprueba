import { Product } from "./product";

export interface BudgetOptimizerProps {
  budget: number | null;
  onBudgetChange: (newBudget: number | null) => void;
  bestCombination: Product[];
}
