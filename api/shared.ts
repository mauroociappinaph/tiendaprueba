import { Product, CartItem } from "@types";

export const products: Product[] = [
  { id: 1, name: "Producto 1", price: 60 },
  { id: 2, name: "Producto 2", price: 100 },
  { id: 3, name: "Producto 3", price: 120 },
  { id: 4, name: "Producto 4", price: 70 },
];

// Simple in-memory cart store (productId -> quantity)
// Note: In serverless environments this may reset between invocations, which is acceptable for this test.
export const cartQuantities: Map<number, number> = new Map();

export function getCartItems(): CartItem[] {
  const items: CartItem[] = [];
  for (const [productId, quantity] of cartQuantities.entries()) {
    const product = products.find((p) => p.id === productId);
    if (product && quantity > 0) {
      items.push({ ...product, quantity });
    }
  }
  return items;
}
