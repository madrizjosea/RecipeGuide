import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to={'/home'}>
        <button>Recipes</button>
      </Link>
    </div>
  );
}

export default Landing;
