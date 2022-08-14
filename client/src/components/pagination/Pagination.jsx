import React from 'react';
import { useDispatch } from 'react-redux';

export default function Pagination({
  itemsPerPage,
  totalItems,
  dispatchHandler,
}) {
  const dispatch = useDispatch();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e, number) => {
    e.preventDefault();
    dispatch(dispatchHandler(number));
  };

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <button key={number} onClick={e => handleClick(e, number)}>
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
}
