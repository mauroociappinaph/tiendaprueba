import { Product } from "./product";

export interface BudgetOptimizerProps {
  budget: string;
  onBudgetChange: (newBudget: string) => void;
  bestCombination: Product[];
}
