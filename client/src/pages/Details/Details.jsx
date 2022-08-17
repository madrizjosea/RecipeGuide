import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetails, clearDetails } from '../../redux/actions';
import Error from '../../components/Error/Error.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import s from './Details.module.css';

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector(state => state.details);
  const error = useSelector(state => state.requestErrorMsg);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div>
      {details.name ? (
        <div className={s.container}>
          <div className={s.imageContainer}>
            <h2>{details.name}</h2>
            <img src={details.image} alt="recipe" />
            {details.healthScore && <h4>Health Score</h4>}
            {details.healthScore && <p>{details.healthScore}</p>}
            {details.dishTypes && <h4>Dish Types:</h4>}
            {details.dishTypes &&
              details.dishTypes.map((type, i) => <p key={i}>{type}</p>)}
            {details.summary && <h4>Summary</h4>}
            {details.summary && <p>{details.summary}</p>}
          </div>
          <div className={s.content}>
            {details.diets && <h4>Diets</h4>}
            {details.diets &&
              details.diets.map((diet, i) => <p key={i}>{diet}</p>)}
            {details.steps && <h4>Steps</h4>}
            {details.steps &&
              details.steps.map((step, i) => <p key={i}>{step}</p>)}
          </div>
        </div>
      ) : error ? (
        <Error />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Details;
