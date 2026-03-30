import React from 'react';
import { motion } from 'framer-motion';

function BudgetCard({ title, value, label, highlight, children }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`budget-card ${highlight ? 'highlight' : ''}`}
    >
      <div className="budget-card-header">
        <p>{title}</p>
        <span>{label}</span>
      </div>
      <h3>{value}</h3>
      {children}
    </motion.article>
  );
}

export default BudgetCard;
