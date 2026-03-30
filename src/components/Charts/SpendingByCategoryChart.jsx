import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from './ChartCard';

const COLORS = ['#2563eb', '#10b981', '#f97316', '#e11d48', '#8b5cf6', '#047857', '#0ea5e9', '#facc15'];

function SpendingByCategoryChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <ChartCard title="Spending by Category">
        <div className="empty-state">
          <p>Add expense transactions to visualize category spending.</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Spending by Category">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" outerRadius={110} innerRadius={45} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default SpendingByCategoryChart;
