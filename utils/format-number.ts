export function formatNumber(
  value: number,
  locale?: string, // ak nie je zadané, použije sa automaticky lokalita zariadenia
  currency?: string // voliteľne symbol meny
): string {
  const userLocale = locale ?? Intl.DateTimeFormat().resolvedOptions().locale;

  return new Intl.NumberFormat(userLocale, {
    style: currency ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
