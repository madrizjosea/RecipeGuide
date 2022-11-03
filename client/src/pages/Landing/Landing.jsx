import React from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';

function Landing() {
  return (
    <div className={s.container}>
      <h1 className={s.header}>Recipe Guide</h1>
      <p>find inspiration in our world wide collection of recipes</p>
      <button className={s.btn}>
        <Link to="/home">Get Started</Link>
      </button>
    </div>
  );
}

export default Landing;
