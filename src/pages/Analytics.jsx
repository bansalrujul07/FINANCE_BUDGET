import { useMemo } from 'react';
import { format } from 'date-fns';
import { useTransactions } from '../hooks/useTransactions';
import { useCurrency } from '../hooks/useCurrency';
import SpendingByCategoryChart from '../components/Charts/SpendingByCategoryChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';
import IncomeExpenseChart from '../components/Charts/IncomeExpenseChart';

function AnalyticsPage() {
  const { transactions, totals } = useTransactions();
  const safeTransactions = transactions ?? [];
  const { formatCurrency } = useCurrency('INR');

  const spendingByCategory = useMemo(() => {
    const categoryMap = {};

    safeTransactions.forEach((item) => {
      if (item.type !== 'expense') return;
      const category = item.category || 'Other';
      const amount = Number(item.amount) || 0;
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    return Object.entries(categoryMap)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [safeTransactions]);

  const monthlyTrend = useMemo(() => {
    const grouped = {};

    safeTransactions.forEach((item) => {
      if (!item.date) return;
      const date = new Date(item.date);
      if (Number.isNaN(date.getTime())) return;
      const itemType = item.type === 'income' ? 'income' : item.type === 'expense' ? 'expense' : null;
      if (!itemType) return;

      const label = format(date, 'MMM yyyy');
      const key = format(date, 'yyyy-MM');
      if (!grouped[key]) {
        grouped[key] = { label, income: 0, expense: 0 };
      }
      grouped[key][itemType] += Number(item.amount) || 0;
    });

    return Object.keys(grouped)
      .sort()
      .map((key) => ({ ...grouped[key] }));
  }, [safeTransactions]);

  const incomeExpenseData = useMemo(() => monthlyTrend.map((item) => ({ ...item })), [monthlyTrend]);

  const topSpendingCategory = spendingByCategory.length ? spendingByCategory[0].category : 'No spending yet';

  return (
    <section className="analytics-page">
      <div className="page-heading">
        <h2>Analytics</h2>
        <p>Visualize financial performance with category spending, monthly trends, and income vs expenses.</p>
      </div>

      <div className="analytics-metrics">
        <article className="metric-card">
          <p>Total Income</p>
          <h3>{formatCurrency(totals.totalIncome)}</h3>
        </article>
        <article className="metric-card">
          <p>Total Expenses</p>
          <h3>{formatCurrency(totals.totalExpenses)}</h3>
        </article>
        <article className="metric-card">
          <p>Net Balance</p>
          <h3>{formatCurrency(totals.netBalance)}</h3>
        </article>
        <article className="metric-card">
          <p>Top Spending Category</p>
          <h3>{topSpendingCategory}</h3>
        </article>
      </div>

      <div className="charts-grid">
        <SpendingByCategoryChart data={spendingByCategory} />
        <MonthlyTrendChart data={monthlyTrend} />
        <IncomeExpenseChart data={incomeExpenseData} />
      </div>
    </section>
  );
}

export default AnalyticsPage;
