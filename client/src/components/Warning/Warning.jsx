import React from 'react';
import s from './Warning.module.css';

const Warning = ({ message, error, header }) => {
  return (
    <div>
      {header ? (
        error ? (
          <div className={s.error}>
            <h2>{message}</h2>
          </div>
        ) : (
          <div className={s.success}>
            <h2>{message}</h2>
          </div>
        )
      ) : error ? (
        <div className={s.error}>
          <h5>{message}</h5>
        </div>
      ) : null}
    </div>
  );
};

export default Warning;
