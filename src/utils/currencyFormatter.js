export function formatCurrency(value, currency = 'INR') {
  const locale = currency === 'USD' ? 'en-US' : currency === 'INR' ? 'en-IN' : 'en-US';
  const maximumFractionDigits = currency === 'USD' ? 2 : 0;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(value);
}
