import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.container}>
        <>
          <h1 className={styles.title}>Not Found</h1>
          <div className={styles.body}>
            <p>This page does not extis. CLick bellow to go back to our home page</p>
          </div>
          <button className={styles.btn}>
            <Link to="/home">
              Home
            </Link>
          </button>
        </>
      </section>
    </div>
  );
}

export default NotFound;
