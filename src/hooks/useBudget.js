import { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

export function useBudget() {
  const { transactions, budget, updateBudget } = useFinance();

  const expenseTotal = useMemo(
    () =>
      transactions.reduce((sum, transaction) => {
        if (transaction.type === 'expense') {
          return sum + Number(transaction.amount);
        }
        return sum;
      }, 0),
    [transactions]
  );

  const remainingBudget = useMemo(() => {
    return Math.max(0, Number(budget.monthlyBudget) - expenseTotal);
  }, [budget.monthlyBudget, expenseTotal]);

  const usagePercentage = useMemo(() => {
    if (!budget.monthlyBudget) return 0;
    return Math.min(100, Math.round((expenseTotal / Number(budget.monthlyBudget)) * 100));
  }, [budget.monthlyBudget, expenseTotal]);

  return {
    budget,
    expenseTotal,
    remainingBudget,
    usagePercentage,
    updateBudget,
  };
}
