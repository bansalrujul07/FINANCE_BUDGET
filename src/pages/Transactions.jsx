import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { sortTransactions, SORT_OPTIONS, useTransactions } from '../hooks/useTransactions';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar/SearchBar';
import Filters from '../components/Filters/Filters';
import TransactionCard from '../components/TransactionCard/TransactionCard';

const initialFilters = {
  category: '',
  type: '',
  startDate: '',
  endDate: '',
  recurringOnly: false,
};

function TransactionsPage() {
  const navigate = useNavigate();
  const { categories, deleteTransaction, updateTransaction, filterTransactions } = useTransactions();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [sortKey, setSortKey] = useState(SORT_OPTIONS.DATE_LATEST);
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  const filteredTransactions = useMemo(
    () =>
      filterTransactions({
        searchText: debouncedSearchQuery,
        category: filters.category,
        type: filters.type,
        startDate: filters.startDate,
        endDate: filters.endDate,
        recurringOnly: filters.recurringOnly,
      }),
    [debouncedSearchQuery, filters, filterTransactions]
  );

  const visibleTransactions = useMemo(
    () => sortTransactions(filteredTransactions, sortKey),
    [filteredTransactions, sortKey]
  );

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  return (
    <section className="transactions-page">
      <div className="transactions-header">
        <div>
          <h2>Transactions</h2>
          <p>View, edit, and manage all your personal finance activity.</p>
        </div>
        <button className="primary-btn" type="button" onClick={() => navigate('/transactions/new')}>
          <FaPlus /> Add Transaction
        </button>
      </div>

      <div className="transactions-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="sort-panel">
          <label className="filter-group">
            <span>Sort by</span>
            <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
              <option value={SORT_OPTIONS.DATE_LATEST}>Date: Latest</option>
              <option value={SORT_OPTIONS.DATE_OLDEST}>Date: Oldest</option>
              <option value={SORT_OPTIONS.AMOUNT_HIGH_LOW}>Amount: High to low</option>
              <option value={SORT_OPTIONS.AMOUNT_LOW_HIGH}>Amount: Low to high</option>
              <option value={SORT_OPTIONS.CATEGORY_AZ}>Category: A to Z</option>
            </select>
          </label>
          <Filters
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
      </div>

      {visibleTransactions.length === 0 ? (
        <div className="empty-state">
          <p>
            {searchQuery || filters.category || filters.type || filters.startDate || filters.endDate || filters.recurringOnly
              ? 'No results found for the current filters.'
              : 'No transactions yet. Add your first income or expense to start tracking your budget.'}
          </p>
        </div>
      ) : (
        <div className="transaction-list">
          <AnimatePresence>
            {visibleTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
                onUpdate={updateTransaction}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

export default TransactionsPage;
