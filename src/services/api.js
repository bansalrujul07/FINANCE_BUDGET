import axios from 'axios';

const API_BASE = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchExchangeRates(baseCurrency = 'INR') {
  try {
    const response = await axios.get(`${API_BASE}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    throw new Error(`Failed to fetch exchange rates: ${status || 'unknown'}`);
  }
}

export function convertCurrency(amount, rates, targetCurrency = 'USD') {
  if (!rates || !rates[targetCurrency]) {
    return null;
  }
  const value = Number(amount) * Number(rates[targetCurrency]);
  return Number.isFinite(value) ? value : null;
}
