import { useEffect, useMemo, useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useCurrency } from '../hooks/useCurrency';
import { convertCurrency, fetchExchangeRates } from '../services/api';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import SpendingByCategoryChart from '../components/Charts/SpendingByCategoryChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';

function DashboardPage() {
  const { transactions, totals } = useTransactions();
  const safeTransactions = transactions ?? [];
  const { formatCurrency } = useCurrency('INR');

  const [exchangeRates, setExchangeRates] = useState(null);
  const [exchangeError, setExchangeError] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  const topCategory = useMemo(() => {
    const categoryTotals = safeTransactions.reduce((map, transaction) => {
      if (transaction.type !== 'expense') return map;
      const category = transaction.category || 'Other';
      const amount = Number(transaction.amount) || 0;
      map[category] = (map[category] || 0) + amount;
      return map;
    }, {});

    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category)[0] || 'No spending yet';
  }, [safeTransactions]);

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

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!grouped[key]) {
        grouped[key] = { label, income: 0, expense: 0 };
      }
      grouped[key][itemType] += Number(item.amount) || 0;
    });

    return Object.keys(grouped)
      .sort()
      .map((key) => grouped[key]);
  }, [safeTransactions]);

  useEffect(() => {
    async function loadRates() {
      try {
        const data = await fetchExchangeRates('INR');
        setExchangeRates(data.rates);
      } catch (error) {
        setExchangeError('Unable to load exchange rates');
      } finally {
        setIsLoadingRates(false);
      }
    }

    loadRates();
  }, []);

  const recentTransactions = useMemo(
    () =>
      [...safeTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [safeTransactions]
  );

  const totalIncomeUSD = useMemo(
    () => convertCurrency(totals.totalIncome, exchangeRates, 'USD'),
    [totals.totalIncome, exchangeRates]
  );

  const totalExpenseUSD = useMemo(
    () => convertCurrency(totals.totalExpenses, exchangeRates, 'USD'),
    [totals.totalExpenses, exchangeRates]
  );

  const usdFormatter = useCurrency('USD');

  const formatTransactionDate = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? String(value ?? '') : date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="section-surface p-6">
      <div className="section-heading">
        <h2>Dashboard</h2>
        <p>Review your overall financial health and recent activity at a glance.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="dashboard-card p-5">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Total Income</p>
          <h3 className="mt-4 text-3xl font-semibold text-success">{formatCurrency(totals.totalIncome)}</h3>
          <p className="mt-3 text-sm text-slate-400">Current earnings for your portfolio</p>
          {isLoadingRates ? (
            <LoadingIndicator text="Loading rates..." />
          ) : exchangeError ? (
            <p className="mt-4 text-sm text-rose-300">{exchangeError}</p>
          ) : totalIncomeUSD !== null ? (
            <p className="mt-4 text-sm text-slate-400">{usdFormatter.formatCurrency(totalIncomeUSD)} USD equivalent</p>
          ) : null}
        </div>

        <div className="dashboard-card p-5">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Total Expense</p>
          <h3 className="mt-4 text-3xl font-semibold text-danger">{formatCurrency(totals.totalExpenses)}</h3>
          <p className="mt-3 text-sm text-slate-400">Total spending this month</p>
          {isLoadingRates ? (
            <LoadingIndicator text="Loading rates..." />
          ) : exchangeError ? (
            <p className="mt-4 text-sm text-rose-300">{exchangeError}</p>
          ) : totalExpenseUSD !== null ? (
            <p className="mt-4 text-sm text-slate-400">{usdFormatter.formatCurrency(totalExpenseUSD)} USD equivalent</p>
          ) : null}
        </div>

        <div className="dashboard-card p-5">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Net Balance</p>
          <h3 className="mt-4 text-3xl font-semibold text-white">{formatCurrency(totals.netBalance)}</h3>
          <p className="mt-3 text-sm text-slate-400">Income minus expenses</p>
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{topCategory}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr] mt-6">
        <div className="chart-card p-5">
          <div className="chart-card-header">
            <h3>Income vs Expense</h3>
          </div>
          <div className="chart-card-body">
            {monthlyTrend.length > 0 ? (
              <MonthlyTrendChart data={monthlyTrend} />
            ) : (
              <div className="empty-state">
                <p>No trend data available yet. Add transactions to populate this chart.</p>
              </div>
            )}
          </div>
        </div>

        <div className="chart-card p-5">
          <div className="chart-card-header">
            <h3>Expense Categories</h3>
          </div>
          <div className="chart-card-body">
            {spendingByCategory.length > 0 ? (
              <SpendingByCategoryChart data={spendingByCategory} />
            ) : (
              <div className="empty-state">
                <p>No expense category data yet. Add expense transactions to show category distribution.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-surface mt-6 overflow-hidden p-5">
        <div className="recent-header">
          <div>
            <h3>Recent Transactions</h3>
            <p className="text-sm text-slate-400">Latest 5 entries to keep track of your cash flow.</p>
          </div>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions added yet. Add income or expenses to populate the dashboard.</p>
          </div>
        ) : (
          <div className="transaction-table w-full overflow-x-auto">
            <div className="transaction-table-header grid grid-cols-[2fr_1fr_1fr_1.2fr] gap-4 px-4 py-3 text-sm uppercase tracking-[0.24em] text-slate-400">
              <span>Title</span>
              <span>Amount</span>
              <span>Type</span>
              <span>Date</span>
            </div>
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="transaction-row grid grid-cols-[2fr_1fr_1fr_1.2fr] gap-4 px-4 py-4 transition hover:bg-white/5"
              >
                <div>
                  <p className="font-semibold text-white">{transaction.title}</p>
                  <p className="text-sm text-slate-400">{transaction.category}</p>
                </div>
                <div className={`font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="text-sm uppercase tracking-[0.24em] text-slate-400">{transaction.type}</div>
                <div className="text-sm text-slate-400">{formatTransactionDate(transaction.date)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
