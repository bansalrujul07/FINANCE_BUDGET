import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

const TRANSACTION_TYPES = ['income', 'expense'];

export const SORT_OPTIONS = {
  DATE_LATEST: 'date_latest',
  DATE_OLDEST: 'date_oldest',
  AMOUNT_HIGH_LOW: 'amount_high_low',
  AMOUNT_LOW_HIGH: 'amount_low_high',
  CATEGORY_AZ: 'category_az',
};

export function sortTransactions(transactions, sortKey) {
  if (!sortKey) return [...transactions];

  return [...transactions].sort((left, right) => {
    switch (sortKey) {
      case SORT_OPTIONS.DATE_LATEST:
        return new Date(right.date) - new Date(left.date);
      case SORT_OPTIONS.DATE_OLDEST:
        return new Date(left.date) - new Date(right.date);
      case SORT_OPTIONS.AMOUNT_HIGH_LOW:
        return Number(right.amount) - Number(left.amount);
      case SORT_OPTIONS.AMOUNT_LOW_HIGH:
        return Number(left.amount) - Number(right.amount);
      case SORT_OPTIONS.CATEGORY_AZ:
        return left.category.localeCompare(right.category);
      default:
        return 0;
    }
  });
}

export function useTransactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();

  const normalizedTransactions = useMemo(
    () =>
      transactions.map((transaction) => ({
        ...transaction,
        date:
          transaction.date instanceof Date
            ? transaction.date.toISOString().slice(0, 10)
            : transaction.date,
        title: transaction.title ?? '',
        category: transaction.category ?? 'Other',
        notes: transaction.notes ?? '',
      })),
    [transactions]
  );

  const totals = useMemo(() => {
    return normalizedTransactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount) || 0;

        if (transaction.type === 'income') {
          acc.totalIncome += amount;
        } else {
          acc.totalExpenses += amount;
        }
        acc.netBalance = acc.totalIncome - acc.totalExpenses;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0, netBalance: 0 }
    );
  }, [normalizedTransactions]);

  const categories = useMemo(
    () => Array.from(new Set(normalizedTransactions.map((transaction) => transaction.category))).sort(),
    [normalizedTransactions]
  );

  const filterTransactions = ({ category, type, startDate, endDate, searchText, recurringOnly }) => {
    return normalizedTransactions.filter((transaction) => {
      const matchesCategory = category ? transaction.category === category : true;
      const matchesType = type ? transaction.type === type : true;
      const transactionDate = new Date(transaction.date);
      const matchesDateRange =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate));
      const lowerSearch = searchText?.toLowerCase() ?? '';
      const transactionNotes = transaction.notes?.toLowerCase() ?? '';
      const matchesSearch =
        !lowerSearch ||
        transaction.title.toLowerCase().includes(lowerSearch) ||
        transactionNotes.includes(lowerSearch);
      const matchesRecurring = recurringOnly ? transaction.recurring === true : true;

      return matchesCategory && matchesType && matchesDateRange && matchesSearch && matchesRecurring;
    });
  };

  return {
    transactions: normalizedTransactions,
    totals,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
    TRANSACTION_TYPES,
  };

  return {
    transactions,
    totals,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
    TRANSACTION_TYPES,
  };
}
