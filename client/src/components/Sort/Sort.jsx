import React from 'react';
import { useDispatch } from 'react-redux';

function Sort({ label, options, dispatchHandler }) {
  const dispatch = useDispatch();

  const handleSort = e => {
    const { value } = e.target;
    dispatch(dispatchHandler(value));
  };

  return (
    <div>
      <select name={label} onChange={e => handleSort(e)}>
        <option>{`${label} `}</option>
        {options?.map((option, idx) => (
          <optgroup key={idx} label={option.name}>
            {option.values?.map((value, idx) => (
              <option key={idx} value={value}>
                {`${option.name} ${value}`}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default Sort;
