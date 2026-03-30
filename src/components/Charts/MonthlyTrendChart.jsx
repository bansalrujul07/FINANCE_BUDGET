import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from './ChartCard';

function MonthlyTrendChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <ChartCard title="Monthly Spending Trend">
        <div className="empty-state">
          <p>Add transactions to see the monthly income and expense trend.</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Monthly Spending Trend">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fill: '#475569' }} />
          <YAxis tick={{ fill: '#475569' }} />
          <Tooltip formatter={(value) => [`₹${value}`, 'Expense']} />
          <Line type="monotone" dataKey="expense" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default MonthlyTrendChart;
