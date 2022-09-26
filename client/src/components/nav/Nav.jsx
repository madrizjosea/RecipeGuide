import React from 'react';
import { Link } from 'react-router-dom';
import s from './Nav.module.css';

const Nav = () => {
  return (
    <header>
      <div className={s.container}>
        <Link className={s.links} to="/home">
          <h3>Home</h3>
        </Link>
        <Link className={s.links} to="/home/create">
          <button className={s.btn}>Create a Recipe</button>
        </Link>
      </div>
    </header>
  );
};

export default Nav;
