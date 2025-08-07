export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

/**
 * Valida un id de producto válido: entero positivo (> 0).
 * Mantiene una abstracción por si la regla evoluciona (p. ej., rango máximo).
 */
export function isValidProductId(value: unknown): value is number {
  return isPositiveInteger(value);
}
