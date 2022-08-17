import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  postRecipe,
  getDiets,
  getRecipes,
  clearSuccessMsg,
  clearErrorMsg,
} from '../../redux/actions';
import { recipeValidator } from '../../helpers/recipeValidator.js';
import Filter from '../../components/Filter/Filter.jsx';
import Warning from '../../components/Warning/Warning.jsx';
import s from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);

  const errorMsg = useSelector(state => state.requestErrorMsg);
  const successMsg = useSelector(state => state.requestSuccessMsg);

  useEffect(() => {
    if (!diets.length) dispatch(getDiets());
    return () => {
      if (successMsg) dispatch(clearSuccessMsg());
      if (errorMsg) dispatch(clearErrorMsg());
    };
  }, [dispatch, diets.length, successMsg, errorMsg]);

  // Initial states
  const [stepInput, setStepInput] = useState('');
  const [inputError, setInputError] = useState({
    name: '',
    summary: '',
    healthScore: '',
    diets: '',
    image: '',
    submit: true,
    submitMsg: '',
  });
  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: 0,
    steps: [],
    diets: [],
    image: '',
  });

  // Form handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setInput(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setInputError(
      recipeValidator({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !inputError.name &&
      input.name &&
      !inputError.summary &&
      input.summary &&
      !inputError.healthScore &&
      input.healthScore &&
      !inputError.diets &&
      input.diets.length > 0 &&
      !inputError.image &&
      input.image
    ) {
      dispatch(postRecipe(input));
      if (!errorMsg) {
        dispatch(getRecipes());
        setInput({
          name: '',
          summary: '',
          healthScore: 0,
          steps: [],
          diets: [],
          image: '',
        });
      }
    } else {
      setInputError(prev => {
        return {
          ...prev,
          submit: true,
          submitMsg: `Fill out the form before submiting`,
        };
      });
    }
  };

  // Step creation handlers
  const handleStepChange = e => {
    let { value } = e.target;
    setStepInput(value);
  };

  const handleStepSubmit = e => {
    e.preventDefault();
    if (stepInput) {
      setInput(prev => {
        return {
          ...prev,
          steps: [...prev.steps, stepInput],
        };
      });
    }
    setStepInput('');
  };

  const deleteStep = (e, id) => {
    e.preventDefault();
    setInput(prev => {
      return {
        ...prev,
        steps: prev.steps.filter((step, idx) => idx !== id),
      };
    });
  };

  // Diets handler
  const handleDietChange = value => {
    !input.diets.includes(value)
      ? setInput(prev => {
          return {
            ...prev,
            diets: [...prev.diets, value],
          };
        })
      : setInput(prev => {
          return {
            ...prev,
            diets: prev.diets.filter(diet => diet !== value),
          };
        });
  };

  const deleteDiet = (e, id) => {
    e.preventDefault();
    setInput(prev => {
      return {
        ...prev,
        diets: prev.diets.filter((diet, idx) => idx !== id),
      };
    });
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={e => handleSubmit(e)}>
        <div className={s.header}>
          <h2>Create your own recipe</h2>
        </div>
        {inputError.submitMsg ? (
          <Warning error={inputError.submit} message={inputError.submitMsg} />
        ) : errorMsg ? (
          <Warning header={true} error={true} message={errorMsg} />
        ) : (
          <Warning header={true} error={false} message={successMsg} />
        )}
        <div className={s.formInput}>
          <label className={s.formLabel}>Name</label>
          <input
            placeholder="Recipe name..."
            type="text"
            name="name"
            value={input.name}
            onChange={e => handleChange(e)}
            className={s.formControl}
          />
          {inputError.name && (
            <Warning error={true} message={inputError.name} />
          )}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Summary</label>
          <textarea
            type="text"
            name="summary"
            value={input.summary}
            onChange={e => handleChange(e)}
            className={s.formControl}
          ></textarea>
          {inputError.summary && (
            <Warning error={true} message={inputError.summary} />
          )}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Health Score</label>
          <div className={s.healthScoreContainer}>
            <input
              type="number"
              min="0"
              max="100"
              name="healthScore"
              value={input.healthScore}
              onChange={e => handleChange(e)}
              className={s.formControl}
            />
          </div>
          {inputError.healthScore && (
            <Warning error={true} message={inputError.healthScore} />
          )}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Steps</label>
          <div className={s.stepContainer}>
            <input
              type="text"
              placeholder="Add an instruction"
              name={'stepInput'}
              value={stepInput}
              onChange={e => handleStepChange(e)}
              className={s.formControl}
            />
            <button onClick={e => handleStepSubmit(e)}>+</button>
          </div>
          {input.steps.map((step, idx) => (
            <div className={s.inputRenderControl} key={idx}>
              {step}
              <button
                className={s.controlBtn}
                onClick={e => deleteStep(e, idx)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Diets</label>
          {inputError.diets && (
            <Warning error={true} message={inputError.diets} />
          )}
          <Filter
            label="Select diets for your recipe"
            options={diets && diets}
            eventHandler={handleDietChange}
          />
          {input.diets &&
            input.diets.map((diet, idx) => (
              <div className={s.inputRenderControl} key={idx}>
                {diet.charAt(0).toUpperCase() + diet.slice(1)}
                <button
                  className={s.controlBtn}
                  onClick={e => deleteDiet(e, idx)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Image</label>
          <input
            type="url"
            name="image"
            onChange={e => handleChange(e)}
            value={input.image}
            className={s.formControl}
          />
          {inputError.image && (
            <Warning error={true} message={inputError.image} />
          )}
        </div>
        <button className={s.btn} type="submit">
          Create
        </button>
        {inputError.submitMsg ? (
          <Warning error={inputError.submit} message={inputError.submitMsg} />
        ) : errorMsg ? (
          <Warning header={true} error={true} message={errorMsg} />
        ) : (
          <Warning header={true} error={false} message={successMsg} />
        )}
      </form>
    </div>
  );
};

export default Form;
