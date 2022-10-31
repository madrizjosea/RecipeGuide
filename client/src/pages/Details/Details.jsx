import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDetails, clearDetails } from '../../redux/actions';
import Search from '../../components/Search/Search';
import Error from '../../components/Error/Error.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import s from './Details.module.css';

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector(state => state.details);
  const error = useSelector(state => state.requestError);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <section>
      <header>
        <div className={s.navContainer}>
          {details.name ? (
            <>
              <Link className={s.links} to="/home">
                Home
              </Link>
              <div className={s.menus}>
                <Search />
              </div>
              <Link className={s.create} to="/home/create">
                Create a Recipe
              </Link>
            </>
          ) : null}
        </div>
      </header>
      {details.name && details.image ? (
        <div className={s.container}>
          <div className={s.imageContainer}>
            <img src={details.image} alt="recipe" />
            <h2>{details.name}</h2>
            <div className={s.healthScore}>
              <h4>Health Score:</h4>
              <p>{details.healthScore}</p>
            </div>
            {details.summary ? (
              <div>
                <h4>Summary</h4>
                <p>{details.summary}</p>
              </div>
            ) : null}
          </div>
          <div className={s.content}>
            <h4>Dishes:</h4>
            {details.dishTypes ? (
              details.dishTypes.map((type, i) => <p key={i}>{type}</p>)
            ) : (
              <p>No particular dish types related to this recipe</p>
            )}
            {details.diets ? (
              <div>
                <h4>Diets</h4>
                {details.diets.map((diet, i) => (
                  <p key={i}>{diet}</p>
                ))}
              </div>
            ) : null}
            {details.steps && <h4>Preparation</h4>}
            {details.steps &&
              details.steps.map((step, i) => <p key={i}>{step}</p>)}
          </div>
        </div>
      ) : !details.name && !error.response ? (
        <Loader />
      ) : error.response ? (
        <Error
          customMsg={`You were linked to an invalid recipe. Click bellow and try again with another one form the catalog`}
        />
      ) : null}
    </section>
  );
}

export default Details;
