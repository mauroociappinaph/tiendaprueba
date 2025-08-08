import { products } from "./shared.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HTTP_STATUS, respondJson, methodNotAllowed } from "./helpers/http.js";

/**
 * Handler de productos
 * - GET: devuelve la lista completa de productos
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    switch (req.method) {
      case "GET":
        return respondJson(res, products, HTTP_STATUS.OK);
      default:
        return methodNotAllowed(res, "GET");
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Products handler error:", error);
    const isDev = process.env.NODE_ENV !== "production";
    const message =
      isDev && error instanceof Error
        ? error.message
        : "Error interno del servidor";
    return res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: message });
  }
}
