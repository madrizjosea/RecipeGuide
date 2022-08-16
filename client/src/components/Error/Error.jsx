import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrorMsg } from '../../redux/actions';

function Error({ customMsg }) {
  const error = useSelector(state => state.requestError);
  const dispatch = useDispatch();

  let currentError = {
    message: error,
    isDefault: true,
  };

  if (error === 'Network Error') {
    currentError.message = 'Server down, please try again later';
    currentError.isDefault = false;
  } else if (error.split('0').length > 1) {
    currentError.message = 'Server error';
    currentError.isDefault = false;
  }

  function handleClick(e) {
    dispatch(clearErrorMsg());
  }

  return (
    <div>
      <h2>{currentError.message}</h2>
      {customMsg && <p>{customMsg}</p>}
      {currentError.isDefault === true ? (
        <Link to="/home">
          <button onClick={handleClick}>Home</button>
        </Link>
      ) : (
        <Link to="/">
          <button onClick={handleClick}>Landing</button>
        </Link>
      )}
    </div>
  );
}

export default Error;
