import React, { useState } from 'react';
import { recipeSorter } from './recipeSorter.js';

function Sorter({ recipes, recipeSetter, recipesReset }) {
  const [sortOpt, setSortOpt] = useState('unsorted');

  const handleSort = e => {
    const { value } = e.target;
    setSortOpt(value);
    const sortedRecipes = recipeSorter(recipes, value);
    if (sortedRecipes) recipeSetter(sortedRecipes);
    else {
      recipesReset();
      setSortOpt('unsorted');
    }
  };

  return (
    <div>
      <select onChange={e => handleSort(e)}>
        {sortOpt !== 'unsorted' ? (
          <option>Clear Sort</option>
        ) : (
          <option>Sort Recipes</option>
        )}
        <option value="A-Z">Alphabetically: A-Z</option>
        <option value="Z-A">Alphabetically: Z-A</option>
        <option value="0-100">HealthScore: 0-100</option>
        <option value="100-0">HealthScore: 100-0</option>
      </select>
    </div>
  );
}

export default Sorter;
