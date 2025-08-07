import { useState, useEffect } from 'react';
import { Product } from '../types';
import { findBestCombination } from '../utils/findBestCombination';

const INITIAL_BUDGET = '150';

export const useBudgetOptimizer = (products: Product[]) => {
  const [budget, setBudget] = useState<string>(INITIAL_BUDGET);
  const [bestCombination, setBestCombination] = useState<Product[]>([]);

  useEffect(() => {
    const numericBudget = Number(budget);
    if (products.length > 0 && numericBudget > 0) {
      const combination = findBestCombination(products, numericBudget);
      setBestCombination(combination);
    } else {
      setBestCombination([]);
    }
  }, [budget, products]);

  return { budget, setBudget, bestCombination };
};