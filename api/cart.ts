import { cartQuantities, getCartItems } from "./shared";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  HTTP_STATUS,
  respondJson,
  respondNoContent,
  methodNotAllowed,
  isPositiveInteger,
  isValidProductId,
  findProductById,
  respondProductNotFound,
} from "./helpers";

/**
 * Handler de carrito
 * Métodos soportados:
 * - GET:    Obtiene items del carrito
 * - POST:   Incrementa en 1 la cantidad del producto indicado por id
 * - PATCH:  Actualiza la cantidad del producto (<= 0 elimina el ítem)
 * - DELETE: Limpia el carrito
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case "GET":
        return respondJson(res, getCartItems());

      case "POST": {
        const { id } = req.body as { id?: number };
        if (!isValidProductId(id)) {
          return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ error: "Invalid product id" });
        }
        const product = findProductById(id);
        if (!product) {
          return respondProductNotFound(res);
        }

        const current = cartQuantities.get(id) ?? 0;
        cartQuantities.set(id, current + 1);
        return respondJson(res, getCartItems(), HTTP_STATUS.CREATED);
      }

      case "PATCH": {
        const { id, quantity } = req.body as { id?: number; quantity?: number };
        if (!isValidProductId(id) || typeof quantity !== "number") {
          return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ error: "Invalid id or quantity" });
        }

        const product = findProductById(id);
        if (!product) {
          return respondProductNotFound(res);
        }

        // quantity <= 0 se interpreta como eliminación del ítem
        if (quantity <= 0) {
          cartQuantities.delete(id);
          return respondJson(res, getCartItems());
        }

        // Validación explícita: quantity entero positivo (optimizado)
        if (!isPositiveInteger(quantity)) {
          return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ error: "Quantity must be a positive integer" });
        }

        cartQuantities.set(id, quantity);
        return respondJson(res, getCartItems());
      }

      case "DELETE":
        cartQuantities.clear();
        return respondNoContent(res);

      default:
        return methodNotAllowed(res, "GET, POST, PATCH, DELETE");
    }
  } catch (error) {
    // Log en servidor para diagnóstico
    // En entorno de desarrollo devolvemos un mensaje más descriptivo
    // En producción, mensaje genérico
    // eslint-disable-next-line no-console
    console.error("Cart handler error:", error);
    const isDev = process.env.NODE_ENV !== "production";
    const message =
      isDev && error instanceof Error ? error.message : "Internal Server Error";
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: message });
  }
}

// helpers movidos a `api/helpers/*`
