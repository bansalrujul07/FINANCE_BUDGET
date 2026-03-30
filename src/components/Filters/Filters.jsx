function Filters({ filters, categories, onFilterChange, onReset }) {
  return (
    <div className="filters-panel">
      <div className="filters-grid">
        <label className="filter-group">
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-group">
          <span>Type</span>
          <select value={filters.type} onChange={(event) => onFilterChange('type', event.target.value)}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="filter-group">
          <span>Start Date</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(event) => onFilterChange('startDate', event.target.value)}
          />
        </label>

        <label className="filter-group">
          <span>End Date</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(event) => onFilterChange('endDate', event.target.value)}
          />
        </label>

        <label className="filter-group checkbox-group">
          <input
            type="checkbox"
            checked={filters.recurringOnly}
            onChange={(event) => onFilterChange('recurringOnly', event.target.checked)}
          />
          <span>Recurring only</span>
        </label>
      </div>

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}

export default Filters;
