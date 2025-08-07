import { Product, CartItem } from "@types";

export const products: Product[] = [
  { id: 1, name: "Producto 1", price: 60 },
  { id: 2, name: "Producto 2", price: 100 },
  { id: 3, name: "Producto 3", price: 120 },
  { id: 4, name: "Producto 4", price: 70 },
];

// Mapa auxiliar para acceso O(1) por id de producto
export const productById: Map<number, Product> = new Map<number, Product>(
  products.map((product) => [product.id, product]),
);

// Simple in-memory cart store (productId -> quantity)
// Note: In serverless environments this may reset between invocations, which is acceptable for this test.
const cartQuantities: Map<number, number> = new Map();

/**
 * Obtiene los ítems actuales del carrito combinando las cantidades almacenadas
 * en memoria con los metadatos del producto.
 *
 * - Omite entradas con cantidad menor o igual a 0.
 * - En entornos serverless, el estado puede reiniciarse entre invocaciones.
 *
 * @returns Lista de ítems del carrito con estructura `{ id, name, price, quantity }`.
 */
export function getCartItems(): CartItem[] {
  const items: CartItem[] = [];
  for (const [productId, quantity] of cartQuantities.entries()) {
    const product = productById.get(productId);
    if (product && quantity > 0) {
      items.push({ ...product, quantity });
    }
  }
  return items;
}

/**
 * Incrementa la cantidad de un producto en el carrito.
 * Si la cantidad resultante es <= 0, elimina el producto del carrito.
 * @param productId Id del producto
 * @param increment Incremento a aplicar (por defecto 1)
 * @returns Cantidad final del producto tras la operación
 */
export function addToCart(productId: number, increment: number = 1): number {
  const currentQuantity = cartQuantities.get(productId) ?? 0;
  const nextQuantity = currentQuantity + increment;
  if (nextQuantity <= 0) {
    cartQuantities.delete(productId);
    return 0;
  }
  cartQuantities.set(productId, nextQuantity);
  return nextQuantity;
}

/**
 * Establece la cantidad exacta de un producto en el carrito.
 * Si `quantity <= 0`, elimina el producto del carrito.
 * @param productId Id del producto
 * @param quantity Cantidad objetivo
 * @returns Cantidad final almacenada (0 si se elimina)
 */
export function setCartQuantity(productId: number, quantity: number): number {
  if (quantity <= 0) {
    cartQuantities.delete(productId);
    return 0;
  }
  cartQuantities.set(productId, quantity);
  return quantity;
}

/**
 * Elimina un producto del carrito.
 * @param productId Id del producto
 */
export function removeFromCart(productId: number): void {
  cartQuantities.delete(productId);
}

/** Vacía por completo el carrito. */
export function clearCart(): void {
  cartQuantities.clear();
}

/** Obtiene la cantidad actual en carrito para un producto. */
export function getCartQuantity(productId: number): number {
  return cartQuantities.get(productId) ?? 0;
}
