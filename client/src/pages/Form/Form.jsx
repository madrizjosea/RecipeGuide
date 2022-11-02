import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipe, clearSuccessMsg } from '../../redux/actions';
import {
  nameValidator,
  summaryValidator,
  healthScoreValidator,
  imageValidator,
} from '../../helpers/validators.js';
import FormInputs from './FormInputs';
import Search from '../../components/Search/Search';
import './css/Form.css';
import Logo from '../../assets/pi-logo.jpg';
import s from './css/Nav.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const successMsg = useSelector(state => state.successMsg);
  const creationErr = useSelector(state => state.requestError);

  const [data, setData] = useState({
    name: '',
    summary: '',
    healthScore: '',
    steps: [],
    diets: [],
    image: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: '',
    image: '',
  });

  const [submitErr, setSubmitErr] = useState('');

  const { healthScore, ...requiredInputs } = data;
  const canSubmit = [...Object.values(requiredInputs)].every(Boolean);

  const handleSubmit = e => {
    e.preventDefault();
    if (canSubmit) {
      dispatch(postRecipe(data));
      if (successMsg) {
        setSubmitErr('');
        setData({
          name: '',
          summary: '',
          healthScore: '',
          steps: [],
          diets: [],
          image: '',
        });
      }
    } else {
      setSubmitErr('Check all required fields');
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setData(prevState => ({ ...prevState, [name]: value }));
    let errorMsg = '';
    if (name === 'name') {
      errorMsg = nameValidator(value);
    }
    if (name === 'summary') {
      errorMsg = summaryValidator(value);
    }
    if (name === 'healthScore') {
      errorMsg = healthScoreValidator(value);
    }
    if (name === 'image') {
      errorMsg = imageValidator(value);
    }
    setErrors(prevState => ({ ...prevState, [name]: errorMsg }));
  };

  const handleStepSubmit = value => {
    setData(prevState => ({
      ...prevState,
      steps: [...prevState.steps, value],
    }));
  };

  const deleteStep = index => {
    setData(prevState => ({
      ...prevState,
      steps: prevState.steps.filter((step, idx) => idx !== index),
    }));
  };

  const handleDietChange = e => {
    const { value } = e.target;
    if (value && !data.diets.includes(value)) {
      setData(prevState => ({
        ...prevState,
        diets: [...prevState.diets, value],
      }));
    }
  };

  const deleteDiet = id => {
    setData(prevState => ({
      ...prevState,
      diets: prevState.diets.filter((diet, idx) => idx !== id),
    }));
  };

  const resetForm = () => {
    setData({
      name: '',
      summary: '',
      healthScore: '',
      steps: [],
      diets: [],
      image: '',
    });
  };

  useEffect(() => {
    if (!diets.length) dispatch(getDiets());
    return () => {
      setSubmitErr('');
      dispatch(clearSuccessMsg());
    };
  }, [dispatch, diets.length]);

  return diets.length ? (
    <>
      <header>
        <div className={s.navContainer}>
          {diets.length ? (
            <>
              <Link to="/home">
                <img className={s.logo} src={Logo} alt="logo" />
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
      <section className="form-container">
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <section className="form-header">
            <Link to="/home">Home</Link>
            <h2>NEW RECIPE</h2>
            <button className="form-reset-button" onClick={() => resetForm()}>
              Reset
            </button>
          </section>

          {<p>{successMsg}</p> || <p>{submitErr}</p>}
          {creationErr.message ? (
            <p>Creation failed due to: {creationErr.message}</p>
          ) : null}

          <FormInputs
            data={data}
            diets={diets}
            handleChange={handleChange}
            handleStepSubmit={handleStepSubmit}
            deleteStep={deleteStep}
            handleDietChange={handleDietChange}
            deleteDiet={deleteDiet}
            errors={errors}
          />

          <button type="submit" className="form-button" disabled={!canSubmit}>
            Create
          </button>
        </form>
      </section>
    </>
  ) : null;
};

export default Form;
