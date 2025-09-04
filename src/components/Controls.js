import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Controls = ({ total, size, sort, onChangePageSize, onChangeSort, currentPage = 1 }) => {
  const actualCurrentPage = Math.max(1, currentPage);
  const showingStart = (actualCurrentPage - 1) * size + 1;
  const showingEnd = Math.min(actualCurrentPage * size, total);

  return (
    <section className="controls">
      <div className="pagination-info">
        Showing {showingStart} - {showingEnd} of {total}
      </div>

      <div className="filter-sort-group">
        <div className="control-group">
          <label htmlFor="show-per-page">Show per page:</label>
          <div className="select-with-icon">
            <select
              id="show-per-page"
              value={size}
              onChange={(e) => onChangePageSize(+e.target.value)}
            >
              {[10, 20, 50].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>

        <div className="control-group">
          <label htmlFor="sort-by">Sort by:</label>
          <div className="select-with-icon">
            <select
              id="sort-by"
              value={sort}
              onChange={(e) => onChangeSort(e.target.value)}
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Controls;
