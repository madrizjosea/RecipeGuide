import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to={'/browse'}>
        <button>Recipes</button>
      </Link>
    </div>
  );
}

export default Landing;
