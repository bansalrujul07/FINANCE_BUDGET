import axios from 'axios';

const API_BASE = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchExchangeRates(baseCurrency = 'INR') {
  const response = await axios.get(`${API_BASE}/${baseCurrency}`);
  return response.data;
}

export function convertCurrency(amount, rates, targetCurrency = 'USD') {
  if (!rates || !rates[targetCurrency]) {
    return null;
  }
  const value = Number(amount) * Number(rates[targetCurrency]);
  return Number.isFinite(value) ? value : null;
}
