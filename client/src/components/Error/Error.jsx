import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrorMsg, clearFilterErrorMsg } from '../../redux/actions';
import styles from './Error.module.css';

function Error({ customMsg }) {
  const dispatch = useDispatch();
  const requestError = useSelector(state => state.requestError);
  const filterErrorMsg = useSelector(state => state.filterErrorMsg);

  function handleClick() {
    dispatch(clearErrorMsg());
    dispatch(clearFilterErrorMsg());
  }

  useEffect(() => {
    return () => {
      dispatch(clearErrorMsg());
      dispatch(clearFilterErrorMsg());
    };
  }, [dispatch]);

  return (
    <div className={styles.mainContainer}>
      <section className={styles.container}>
        {customMsg ? (
          <>
            <h1 className={styles.title}>Something went wrong</h1>
            <div className={styles.body}>
              <p>{customMsg}</p>
            </div>
            <button className={styles.btn}>
              <Link onClick={handleClick} to="/home">
                Recipes
              </Link>
            </button>
          </>
        ) : filterErrorMsg ? (
          <>
            <h1 className={styles.title}>Something went wrong</h1>
            <div className={styles.body}>
              <p>{filterErrorMsg}</p>
            </div>
            <button className={styles.btn} onClick={handleClick}>
              X
            </button>
          </>
        ) : requestError.message &&
          (requestError.message === 'Network Error' ||
            requestError.message === 'Request failed with status code 500') ? (
          <>
            <h1 className={styles.title}>Something went wrong</h1>
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
          </>
        ) : requestError.response ? (
          <>
            <h1 className={styles.title}>Something went wrong</h1>
            <div className={styles.body}>
              <p>{requestError.response.data.message}</p>
            </div>
            <button className={styles.closeBtn} onClick={handleClick}>
              X
            </button>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default Error;
