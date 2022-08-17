import React from 'react';
import { useDispatch } from 'react-redux';
import s from './Filter.module.css';

function Filter({ label, options, dispatchHandler, eventHandler }) {
  const dispatch = useDispatch();

  const handleFilter = e => {
    const { value } = e.target;
    if (dispatchHandler) dispatch(dispatchHandler(value));
    else if (eventHandler) eventHandler(value);
  };

  return (
    <div>
      <select onChange={e => handleFilter(e)}>
        <option className={s.btn}>{`${label} `}</option>
        {options?.map((value, idx) => (
          <option className={s.btn} key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
