import { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import { useCurrency } from '../hooks/useCurrency';
import BudgetCard from '../components/BudgetCard/BudgetCard';

function BudgetPage() {
  const { budget, expenseTotal, remainingBudget, usagePercentage, updateBudget } = useBudget();
  const { formatCurrency } = useCurrency('INR');
  const [budgetInput, setBudgetInput] = useState(String(budget.monthlyBudget ?? ''));

  const budgetExceeded = Number(expenseTotal) > Number(budget.monthlyBudget);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(budgetInput);
    if (!Number.isFinite(value) || value < 0) {
      return;
    }
    updateBudget(value);
  };

  const progressWidth = useMemo(() => {
    if (!budget.monthlyBudget) return 0;
    return Math.min(100, Math.round((expenseTotal / Number(budget.monthlyBudget)) * 100));
  }, [budget.monthlyBudget, expenseTotal]);

  return (
    <section className="budget-page">
      <div className="page-heading">
        <h2>Budget</h2>
        <p>Set a monthly budget and monitor total expenses, remaining balance, and usage.</p>
      </div>

      <article className="budget-overview">
        <div className="budget-input-card">
          <h3>Monthly Budget</h3>
          <form className="budget-form" onSubmit={handleSubmit}>
            <label>
              <span>Budget amount</span>
              <input
                type="number"
                min="0"
                step="100"
                value={budgetInput}
                onChange={(event) => setBudgetInput(event.target.value)}
                placeholder="Enter monthly budget"
              />
            </label>
            <button type="submit" className="primary-btn">
              Save Budget
            </button>
          </form>
        </div>

        <div className="budget-cards-grid">
          <BudgetCard title="Total Expenses" value={formatCurrency(expenseTotal)} label="Spent this month" />
          <BudgetCard title="Remaining Budget" value={formatCurrency(remainingBudget)} label="Left to spend" />
          <BudgetCard
            title="Budget Usage"
            value={`${usagePercentage}%`}
            label={budgetExceeded ? 'Budget exceeded' : 'On track'}
            highlight={budgetExceeded}
          >
            <div className="progress-bar">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressWidth}%` }} />
              </div>
            </div>
          </BudgetCard>
        </div>
      </article>
    </section>
  );
}

export default BudgetPage;
