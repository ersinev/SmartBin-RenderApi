import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-input input-cell">
      <h2>Search Data</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
