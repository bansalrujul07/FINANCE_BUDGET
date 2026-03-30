import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FinanceContext = createContext(null);
const STORAGE_KEY = 'finance_app_data';

const defaultState = {
  transactions: [],
  budget: { monthlyBudget: 0 },
};

function loadFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      budget: parsed.budget?.monthlyBudget >= 0 ? parsed.budget : defaultState.budget,
    };
  } catch (error) {
    console.warn('Failed to load finance data from localStorage:', error);
    return defaultState;
  }
}

function saveToStorage(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Unable to save finance data to localStorage:', error);
  }
}

export function FinanceProvider({ children }) {
  const [initialState] = useState(loadFromStorage);
  const [transactions, setTransactions] = useState(initialState.transactions);
  const [budget, setBudget] = useState(initialState.budget);

  useEffect(() => {
    saveToStorage({ transactions, budget });
  }, [transactions, budget]);

  const addTransaction = (transaction) => {
    setTransactions((current) => [transaction, ...current]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  const deleteTransaction = (transactionId) => {
    setTransactions((current) => current.filter((transaction) => transaction.id !== transactionId));
  };

  const updateBudget = (monthlyBudget) => {
    setBudget({ monthlyBudget });
  };

  const value = useMemo(
    () => ({
      transactions,
      budget,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updateBudget,
    }),
    [transactions, budget]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used inside FinanceProvider');
  }
  return context;
}
