import React from 'react';
import s from './Pagination.module.css';

function Pagination({ currentPage, itemsPerPage, totalItems, pageSetter }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Paginations handlers
  const handlePrevious = () => {
    if (currentPage - 1 > 0) {
      pageSetter(currentPage - 1);
    }
  };

  const handlePagination = number => {
    pageSetter(number);
  };

  const handleNext = () => {
    if (currentPage + 1 <= pageNumbers.length) {
      pageSetter(currentPage + 1);
    }
  };

  return (
    <nav className={s.container}>
      <ul className={s.btnContainer}>
        {currentPage > 1 ? (
          <button className={s.btn} onClick={handlePrevious}>
            {'<'}
          </button>
        ) : null}
        {pageNumbers.map(number => (
          <button
            className={s.btn}
            key={number}
            onClick={e => handlePagination(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < pageNumbers.length ? (
          <button className={s.btn} onClick={handleNext}>
            {'>'}
          </button>
        ) : null}
      </ul>
    </nav>
  );
}

export default Pagination;
