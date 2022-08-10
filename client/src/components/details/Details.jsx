import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getRecipeDetails } from '../../redux/actions';

function Details() {

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const details = useSelector(state => state.recipeDetails);
  console.log(details)
  return (
    <div>
      <h1>Recipe Details</h1>
      <p>{details.title}</p>
      <image src={details.image} alt="recipe" />
      <h2>Dish Types:</h2>
      {details.dishTypes.map(type => (
        <p>{type}</p>
      ))}
      <p>Health Score: {details.healthScore}</p>
      <h2>Sumamry:</h2>
      <p>{details.summary}</p>
      <h2>Diets:</h2>
      {details.diets.map(diet => (
        <p>{diet}</p>
      ))}
      <h2>Steps:</h2>
      {details.steps.map(step => (
        <p>{step}</p>
      ))}
      <Link to={'/recipes'}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Details;
