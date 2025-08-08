import { Product } from "./product";

export interface BestCombinationListProps {
  bestCombination: Product[] | null | undefined;
  hasBudget: boolean;
}
