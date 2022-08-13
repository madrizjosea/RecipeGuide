import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Filter({ filterName, options, values, dispatchHandler }) {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = e => {
    const { value } = e.target;
    setFilterValue(value);
    dispatch(dispatchHandler(value));
    setFilterValue('');
  };
  return (
    <>
      {options.length && options.length > 0 ? (
        <section>
          <select
            name={filterName}
            onChange={e => handleFilter(e)}
            value={filterValue}
          >
            <option>{filterName}</option>
            {options?.map((option, idx) => (
              <optgroup key={idx} label={option.name}>
                {option.values?.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </section>
      ) : (
        values.length && (
          <section>
            <select onChange={e => handleFilter(e)} value={filterValue}>
              <option>{filterName}</option>
              {values?.map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </section>
        )
      )}
    </>
  );
}

export default Filter;
