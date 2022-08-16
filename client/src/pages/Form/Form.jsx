import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getDiets, getRecipes } from '../../redux/actions';
import { recipeValidator } from '../../helpers/recipeValidator.js';
import Filter from '../../components/Filter/Filter.jsx';
import Warning from '../../components/Warning/Warning.jsx';
import s from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const errorStatus = useSelector(state => state.requestError);
  const diets = useSelector(state => state.diets);
  
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

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
      if (!errorStatus) {
        dispatch(getRecipes());
        setInput({
          name: '',
          summary: '',
          healthScore: 0,
          steps: [],
          diets: [],
          image: '',
        });
        setInputError(prev => {
          return {
            ...prev,
            submit: false,
            submitMsg: `Recipe created successfuly`,
          };
        });
      } else {
        setInputError(prev => {
          return {
            ...prev,
            submit: true,
            submitMsg: `Creation failed (Server Error)`,
          };
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
          <h2>Create a Recipe</h2>
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Name</label>
          <input
            placeholder="Recipe title..."
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
          <input
            type="number"
            min="0"
            max="100"
            name="healthScore"
            value={input.healthScore}
            onChange={e => handleChange(e)}
            className={s.formControl}
          />
          {inputError.healthScore && (
            <Warning error={true} message={inputError.healthScore} />
          )}
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Steps</label>
          <div>
            <input
              type="text"
              placeholder="Add a detailed step instruction"
              name={'stepInput'}
              value={stepInput}
              onChange={e => handleStepChange(e)}
              className={s.formControl}
            />
            <button onClick={e => handleStepSubmit(e)}>+</button>
            {input.steps.map((step, idx) => (
              <div key={idx}>
                {step}
                <button onClick={e => deleteStep(e, idx)}>x</button>
              </div>
            ))}
          </div>
        </div>
        <div className={s.formInput}>
          <label className={s.formLabel}>Diets</label>
          {inputError.diets && (
            <Warning error={true} message={inputError.diets} />
          )}
          <Filter
            label="Choose diets"
            options={diets && diets}
            eventHandler={handleDietChange}
          />
          {input.diets &&
            input.diets.map((diet, idx) => (
              <div key={idx}>
                {diet}
                <button onClick={e => deleteDiet(e, idx)}>x</button>
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
        <input type="submit" value="Create Recipe" />
        {inputError.submitMsg && (
          <Warning
            header={true}
            error={inputError.submit}
            message={inputError.submitMsg}
          />
        )}
      </form>
      {/* {input.image && !inputError.image && (
        <div className={s.recipeImgContainer}>
          <img src={input.image} alt="your-recipe" />
        </div>
      )} */}
    </div>
  );
};

export default Form;
