import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from './ChartCard';

function IncomeExpenseChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <ChartCard title="Income vs Expense">
        <div className="empty-state">
          <p>Add transactions to display the income vs expense bar chart.</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Income vs Expense">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fill: '#475569' }} />
          <YAxis tick={{ fill: '#475569' }} />
          <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default IncomeExpenseChart;
