import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getByName } from '../../redux/actions';
import s from './Search.module.css';

const Search = () => {
  const histoty = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    const name = inputValue.toLowerCase();
    dispatch(getByName(name));
    setInputValue('');
    histoty.push('/home');
  };

  return (
    <form className={s.container} onSubmit={e => handleSearch(e)}>
      <input
        placeholder="Recipe name..."
        value={inputValue}
        onChange={e => handleChange(e)}
      />
      <button>Search</button>
    </form>
  );
};

export default Search;
