import React from 'react';

function ChartCard({ title, children }) {
  return (
    <section className="chart-card">
      <div className="chart-card-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-card-body">{children}</div>
    </section>
  );
}

export default ChartCard;
