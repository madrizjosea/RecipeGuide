import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={s.container}>
      <ul className={s.links}>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/home/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/home/create">Create a Recipe</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
