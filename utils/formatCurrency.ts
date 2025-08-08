export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
}

export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const { locale, currency } = options;
  const resolvedLocale =
    locale || (typeof navigator !== "undefined" ? navigator.language : "es-ES");
  const resolvedCurrency = currency || "USD";

  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: resolvedCurrency,
    minimumFractionDigits: 2,
  }).format(safeAmount);
}
