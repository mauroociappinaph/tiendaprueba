import type { VercelResponse } from "@vercel/node";
import type { Product } from "@types";
import { products } from "../shared";
import { HTTP_STATUS, respondJson } from "./http";

/**
 * Función pura: devuelve el producto por id o undefined si no existe.
 * No tiene efectos secundarios y es fácilmente testeable.
 */
export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Responde 404 para producto no encontrado. Efecto secundario controlado.
 */
export function respondProductNotFound(res: VercelResponse) {
  return respondJson(
    res,
    { error: "Product not found" },
    HTTP_STATUS.NOT_FOUND,
  );
}
