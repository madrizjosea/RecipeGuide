import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrorMsg, clearFilterErrorMsg } from '../../redux/actions';
import styles from './Error.module.css';

function Error() {
  const dispatch = useDispatch();
  const requestError = useSelector(state => state.requestError);
  const filterErrorMsg = useSelector(state => state.filterErrorMsg);

  function handleClick() {
    dispatch(clearErrorMsg());
    dispatch(clearFilterErrorMsg());
  }

  return (
    <section className={styles.container}>
      {filterErrorMsg ? (
        <div>
          <div className={styles.closeBtn}>
            <button onClick={handleClick}>X</button>
          </div>
          <h1 className={styles.title}>Something went wrong!</h1>
          <div className={styles.body}>
            <p>{filterErrorMsg}</p>
          </div>
        </div>
      ) : requestError.message &&
        (requestError.message === 'Network Error' ||
          requestError.message === 'Request failed with status code 500') ? (
        <div>
          <h1 className={styles.title}>Something went wrong!</h1>
          <div className={styles.body}>
            <p>
              Couldn't get a response from the server. Please try againt later
            </p>
          </div>
          <button className={styles.btn}>
            <Link onClick={handleClick} to="/">
              Back to landing
            </Link>
          </button>
        </div>
      ) : requestError.response.data ? (
        <div>
          <div className={styles.closeBtn}>
            <button onClick={handleClick}>X</button>
          </div>
          <h1 className={styles.title}>Something went wrong!</h1>
          <div className={styles.body}>
            <p>{requestError.response.data.message}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Error;
