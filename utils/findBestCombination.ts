import { Product } from "../types";

/**
 * Finds the combination of products with the highest total value that does not exceed the budget.
 * This implementation uses a brute-force approach by checking every possible subset of products.
 * It is efficient for a small number of products (n < 20).
 * @param products - The list of available products.
 * @param budget - The maximum budget.
 * @returns An array of products representing the best combination.
 */
export const findBestCombination = (
  products: Product[],
  budget: number
): Product[] => {
  if (budget <= 0 || products.length === 0) {
    return [];
  }

  let bestCombination: Product[] = [];
  let maxPrice = 0;

  const n = products.length;
  for (let i = 0; i < 1 << n; i++) {
    const currentCombination: Product[] = [];
    let currentPrice = 0;

    for (let j = 0; j < n; j++) {
      if ((i & (1 << j)) !== 0) {
        currentCombination.push(products[j]);
        currentPrice += products[j].price;
      }
    }
    if (currentPrice <= budget && currentPrice > maxPrice) {
      maxPrice = currentPrice;
      bestCombination = currentCombination;
    }
  }

  return bestCombination;
};
