import { FaSearch } from 'react-icons/fa';

function SearchBar({ value, onChange, placeholder = 'Search by title or notes' }) {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search transactions"
      />
    </div>
  );
}

export default SearchBar;
