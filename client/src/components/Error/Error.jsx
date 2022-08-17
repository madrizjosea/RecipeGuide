import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrorMsg } from '../../redux/actions';
import s from './Error.module.css';

function Error({ customMsg }) {
  const requestError = useSelector(state => state.requestErrorMsg);
  const filterError = useSelector(state => state.filterErrorMsg);
  const dispatch = useDispatch();

  let currentError = {
    message: customMsg,
    isDefault: true,
  };

  if (requestError && requestError === 'Network Error') {
    currentError.message = 'The server is down';
    currentError.isDefault = false;
  } else if (requestError && requestError.split('0').length > 1) {
    currentError.message = 'Server response error';
    currentError.isDefault = false;
  } else {
    currentError.message = requestError;
    currentError.isDefault = true;
  }

  if (filterError) {
    currentError.message = filterError;
    currentError.isDefault = true;
  }

  function handleClick() {
    dispatch(clearErrorMsg());
  }

  return (
    <div className={s.container}>
      <h2>{currentError.message}</h2>
      {currentError.isDefault === true ? (
        <div>
          <p>{customMsg}</p>
          <Link to="/home">
            <button className={s.btn} onClick={handleClick}>Home</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>We're working on a solution. Try again later.</p>
          <Link to="/">
            <button className={s.btn} onClick={handleClick}>Landing</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Error;
