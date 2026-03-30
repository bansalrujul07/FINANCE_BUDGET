import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaEdit, FaTrash, FaSave, FaTimes, FaSyncAlt } from 'react-icons/fa';
import { formatCurrency } from '../../utils/currencyFormatter';

function TransactionCard({ transaction, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(transaction);

  const amountClass = transaction.type === 'income' ? 'amount income' : 'amount expense';

  const formattedDate = useMemo(() => {
    try {
      return format(new Date(transaction.date), 'dd MMM yyyy');
    } catch {
      return transaction.date;
    }
  }, [transaction.date]);

  const handleChange = (field) => (event) => {
    const value = field === 'recurring' ? event.target.checked : event.target.value;
    setDraft((current) => ({ ...current, [field]: field === 'amount' ? Number(value) : value }));
  };

  const handleSave = () => {
    onUpdate(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(transaction);
    setIsEditing(false);
  };

  const formattedNotes = useMemo(() => {
    if (!transaction.notes) return '';
    const text = transaction.notes.trim();
    if (text.length <= 60) return text;
    return `${text.slice(0, 57)}...`;
  }, [transaction.notes]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="transaction-card"
    >
      <div className="transaction-card-header">
        <div>
          <p className="transaction-title">{transaction.title}</p>
          {formattedNotes && <p className="transaction-notes">{formattedNotes}</p>}
          <span className="transaction-category">{transaction.category}</span>
        </div>
        {transaction.recurring && <span className="badge">Recurring</span>}
      </div>

      {isEditing ? (
        <div className="transaction-edit-grid">
          <label>
            Title
            <input type="text" value={draft.title} onChange={handleChange('title')} />
          </label>
          <label>
            Amount
            <input type="number" value={draft.amount} onChange={handleChange('amount')} />
          </label>
          <label>
            Category
            <input type="text" value={draft.category} onChange={handleChange('category')} />
          </label>
          <label>
            Date
            <input type="date" value={draft.date} onChange={handleChange('date')} />
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={draft.recurring} onChange={handleChange('recurring')} />
            Recurring
          </label>
        </div>
      ) : (
        <div className="transaction-details">
          <div className={amountClass}>{formatCurrency(transaction.amount)}</div>
          <div className="transaction-meta">
            <span>{transaction.type.toUpperCase()}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      )}

      <div className="transaction-actions">
        {isEditing ? (
          <>
            <button type="button" className="icon-button save" onClick={handleSave}>
              <FaSave /> Save
            </button>
            <button type="button" className="icon-button cancel" onClick={handleCancel}>
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="icon-button edit" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </button>
            <button type="button" className="icon-button delete" onClick={() => onDelete(transaction.id)}>
              <FaTrash /> Delete
            </button>
          </>
        )}
      </div>
    </motion.article>
  );
}

export default TransactionCard;
