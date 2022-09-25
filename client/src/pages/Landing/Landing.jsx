import React from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';

function Landing() {
  return (
    <div className={s.container}>
      <h1 className={s.header}>Friendly Food Guide</h1>
      <Link to='/home'>
        <button className={s.btn}>Get Started</button>
      </Link>
    </div>
  );
}

export default Landing;
