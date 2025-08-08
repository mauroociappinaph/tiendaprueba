import type { VercelResponse } from "@vercel/node";
import type { Product } from "../../types";
import { productById } from "../shared.js";
import { HTTP_STATUS, respondJson } from "./http.js";

/**
 * Función pura: devuelve el producto por id o undefined si no existe.
 * No tiene efectos secundarios y es fácilmente testeable.
 */
export function findProductById(id: number): Product | undefined {
  return productById.get(id);
}

/**
 * Responde 404 para producto no encontrado. Efecto secundario controlado.
 */
export function respondProductNotFound(res: VercelResponse) {
  return respondJson(
    res,
    { error: "Producto no encontrado" },
    HTTP_STATUS.NOT_FOUND,
  );
}
