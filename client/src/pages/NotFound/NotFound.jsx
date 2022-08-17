import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFound.module.css';

function NotFound() {
  return (
    <div className={s.container}>
      <h2>Error 404: Page Not Found</h2>
      <Link to={'/home'}>
        <button className={s.btn}>Back to Home Page</button>
      </Link>
    </div>
  );
}

export default NotFound;
