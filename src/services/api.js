const API_BASE = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchExchangeRates(baseCurrency = 'INR') {
  const response = await fetch(`${API_BASE}/${baseCurrency}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`);
  }
  return response.json();
}

export function convertCurrency(amount, rates, targetCurrency = 'USD') {
  if (!rates || !rates[targetCurrency]) {
    return null;
  }
  const value = Number(amount) * Number(rates[targetCurrency]);
  return Number.isFinite(value) ? value : null;
}
