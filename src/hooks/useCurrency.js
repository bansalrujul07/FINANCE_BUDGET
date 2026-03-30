import { useCallback } from 'react';
import { formatCurrency } from '../utils/currencyFormatter';

export function useCurrency(defaultCurrency = 'INR') {
  const format = useCallback(
    (value, currency = defaultCurrency) => {
      return formatCurrency(Number(value) || 0, currency);
    },
    [defaultCurrency]
  );

  return {
    currency: defaultCurrency,
    formatCurrency: format,
  };
}
