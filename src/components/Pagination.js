import React from 'react';

const Pagination = ({ page, total, size, onPageChange }) => {
  const totalPages = Math.ceil(total / size);

  const createPages = () => {
    const pages = [];
    const visible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + visible - 1);

    if (end - start < visible - 1) {
      start = Math.max(1, end - visible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = createPages();

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={page === 1}>
        &laquo;
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        &lsaquo;
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={page === num ? 'active' : ''}
        >
          {num}
        </button>
      ))}

      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        &rsaquo;
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;