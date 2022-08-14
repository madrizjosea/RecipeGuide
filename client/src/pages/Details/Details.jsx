import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetails, clearDetails } from '../../redux/actions';
// import s from './Details.module.css';

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector(state => state.details);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails());
    }
  }, [dispatch, id]);

  return (
    <>
      {details.title ? (
        <div>
          <h1>Recipe Details</h1>
          <p>{details?.title}</p>
          <img src={details?.image} alt="recipe" />
          <h2>Dish Types:</h2>
          {details?.dishTypes?.map((type, i) => (
            <p key={i}>{type}</p>
          ))}
          <p>Health Score: {details?.healthScore}</p>
          <h2>Sumamry:</h2>
          <p>{details?.summary}</p>
          <h2>Diets:</h2>
          {details?.diets?.map((diet, i) => (
            <p key={i}>{diet}</p>
          ))}
          <h2>Steps:</h2>
          {details.steps ? (
            details.steps.map((step, i) => <p key={i}>{step}</p>)
          ) : (
            <p>There are no steps for this recipe</p>
          )}
          <Link to={'/home'}>
            <button>Home</button>
          </Link>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default Details;