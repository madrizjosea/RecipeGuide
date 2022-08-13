import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Filter({ option, values, dispatchHandler }) {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = e => {
    const { value } = e.target;
    setFilterValue(value);
    dispatch(dispatchHandler(value));
  };
  return (
    <>
      <h5>{option}: </h5>
      <select onChange={e => handleFilter(e)} value={filterValue}>
        <option>Select an option:</option>
        {values?.map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}

export default Filter;
