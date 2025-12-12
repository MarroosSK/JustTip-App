export function formatNumber(
  value: number,
  locale?: string,
  currency?: string
): string {
  const userLocale = locale ?? Intl.DateTimeFormat().resolvedOptions().locale;

  return new Intl.NumberFormat(userLocale, {
    style: currency ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
