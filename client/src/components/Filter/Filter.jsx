import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Filter.module.css';

function Filter({ label, options, dispatchHandler }) {
  const dispatch = useDispatch();

  const handleFilter = e => {
    const { value } = e.target;
    if (value !== label) dispatch(dispatchHandler(value));
  };

  return (
    <div>
      <select onChange={e => handleFilter(e)}>
        <option className={s.btn}>{`${label}`}</option>
        <optgroup label="Diets">
          {options?.map((value, idx) => (
            <option className={s.btn} key={idx} value={value}>
              {value}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

export default Filter;
