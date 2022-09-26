import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterErrorMsg } from '../../redux/actions';
import { recipeDietFilter } from './recipeDietFilter.js';
import s from './Filter.module.css';

function Filter({ options, recipes, recipeSetter, recipesReset, pageSetter }) {
  const dispatch = useDispatch();

  const [filterOpt, setFilterOtp] = useState('unfiltered');

  const handleFilter = e => {
    const { value } = e.target;
    const filterResult = recipeDietFilter(recipes, value);
    if (filterResult.length > 0) {
      recipeSetter(filterResult);
      setFilterOtp(value);
    } else if (value === 'Clear Filter') {
      recipesReset();
    } else {
      dispatch(setFilterErrorMsg('No recipes found for that diet'));
      setFilterOtp('unfiltered');
    }
    pageSetter(1);
  };

  return (
    <div>
      <select onChange={e => handleFilter(e)}>
        {filterOpt !== 'unfiltered' ? (
          <option>Clear Filter</option>
        ) : (
          <option>Filter by diet</option>
        )}
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
