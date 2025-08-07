import type { VercelResponse } from "@vercel/node";

/**
 * Mapa de códigos de estado HTTP usados por las rutas.
 * Centraliza los valores para mantener consistencia en las respuestas.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_ERROR: 500,
} as const;

/**
 * Envía una respuesta JSON con el status indicado (200 por defecto).
 * Útil para estandarizar respuestas exitosas y reducir repetición.
 */
export function respondJson(
  res: VercelResponse,
  data: unknown,
  status: number = HTTP_STATUS.OK,
) {
  const payload = data === undefined ? null : data;
  return res.status(status).json(payload);
}

/**
 * Envía una respuesta sin contenido (204 No Content).
 * Útil para operaciones que no devuelven cuerpo, p. ej. DELETE exitoso.
 */
export function respondNoContent(res: VercelResponse) {
  return res.status(HTTP_STATUS.NO_CONTENT).end();
}

/**
 * Responde 405 Method Not Allowed e incluye la cabecera Allow
 * con los métodos válidos para el recurso.
 */
export function methodNotAllowed(res: VercelResponse, allowHeader: string) {
  res.setHeader("Allow", allowHeader);
  return res
    .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
    .json({ error: "Method Not Allowed" });
}
