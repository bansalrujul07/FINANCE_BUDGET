import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import { useTransactions } from '../hooks/useTransactions';

const categories = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
];

const transactionSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  type: yup.string().oneOf(['income', 'expense']).required('Transaction type is required'),
  date: yup.date().required('Date is required'),
  notes: yup.string().trim().optional(),
  recurring: yup.boolean(),
});

function AddTransactionPage() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: '',
      category: categories[0],
      type: 'expense',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
      recurring: false,
    },
  });

  const onSubmit = async (data) => {
    addTransaction({
      id: uuidv4(),
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      type: data.type,
      date: data.date,
      notes: data.notes,
      recurring: data.recurring,
    });

    toast.success('Transaction added successfully', {
      autoClose: 4500,
      pauseOnHover: true,
    });
    setTimeout(() => navigate('/transactions'), 600);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="form-card"
    >
      <div className="page-heading">
        <h2>Add Transaction</h2>
        <p>Record income or expense with category, date, budget and recurring details.</p>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <label className="field-group">
            <span>Title</span>
            <input type="text" {...register('title')} placeholder="Salary, groceries, rent" />
            {errors.title && <small className="error-message">{errors.title.message}</small>}
          </label>

          <label className="field-group">
            <span>Amount</span>
            <input type="number" step="0.01" {...register('amount')} placeholder="0.00" />
            {errors.amount && <small className="error-message">{errors.amount.message}</small>}
          </label>

          <label className="field-group">
            <span>Category</span>
            <select {...register('category')}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <small className="error-message">{errors.category.message}</small>}
          </label>

          <label className="field-group">
            <span>Transaction Type</span>
            <select {...register('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && <small className="error-message">{errors.type.message}</small>}
          </label>

          <label className="field-group">
            <span>Date</span>
            <input type="date" {...register('date')} />
            {errors.date && <small className="error-message">{errors.date.message}</small>}
          </label>

          <label className="field-group checkbox-group">
            <input type="checkbox" {...register('recurring')} />
            <span>Mark as recurring expense</span>
          </label>
        </div>

        <label className="field-group full-width">
          <span>Notes</span>
          <textarea {...register('notes')} rows="4" placeholder="Add a note or description" />
          {errors.notes && <small className="error-message">{errors.notes.message}</small>}
        </label>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Transaction'}
        </button>
      </form>

    </motion.section>
  );
}

export default AddTransactionPage;
