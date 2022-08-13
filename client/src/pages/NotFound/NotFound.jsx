import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>Error 404: Not Found</h2>
      <Link to={'/home'}>
        <button>Back to Home Page</button>
      </Link>
    </div>
  );
}

export default NotFound;
