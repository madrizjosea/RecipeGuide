import React from 'react';
import { useDispatch } from 'react-redux';

export default function Pagination({ currentPage, itemsPerPage, totalItems, dispatchHandler }) {

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
    <nav>
      <ul>
        <button onClick={e => handlePrevious(e)}>{'<'}</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={e => handlePagination(e, number)}>
            {number}
          </button>
        ))}
        <button onClick={e => handleNext(e)}>{'>'}</button>
      </ul>
    </nav>
  );
}
