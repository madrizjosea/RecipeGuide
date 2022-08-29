import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Pagination.module.css';

export default function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  dispatchHandler,
}) {
  const dispatch = useDispatch();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Paginations handlers
  const handlePrevious = e => {
    e.preventDefault();
    if (currentPage - 1 > 0) {
      dispatch(dispatchHandler(currentPage - 1));
    }
  };

  const handlePagination = (e, number) => {
    e.preventDefault();
    dispatch(dispatchHandler(number));
  };

  const handleNext = e => {
    e.preventDefault();
    if (currentPage + 1 <= pageNumbers.length) {
      dispatch(dispatchHandler(currentPage + 1));
    }
  };

  return (
    <nav className={s.container}>
      <ul className={s.btnContainer}>
        {currentPage !== 1 ? (
          <button className={s.btn} onClick={e => handlePrevious(e)}>
            {'<'}
          </button>
        ) : null}
        {pageNumbers.map(number => (
          <button
            className={s.btn}
            key={number}
            onClick={e => handlePagination(e, number)}
          >
            {number}
          </button>
        ))}
        {currentPage < pageNumbers.length ? (
          <button className={s.btn} onClick={e => handleNext(e)}>
            {'>'}
          </button>
        ) : null}
      </ul>
    </nav>
  );
}
