import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../redux/actions';
import { recipeValidator } from '../../helpers/recipeValidator.js';
import s from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // Initial states
  const [stepInput, setStepInput] = useState('');
  const [inputError, setInputError] = useState({
    title: '',
    summary: '',
    healthScore: '',
    diets: '',
    image: '',
  });
  const [input, setInput] = useState({
    title: '',
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
    // if (
    //   !inputError.title &&
    //   !inputError.summary &&
    //   !inputError.diets &&
    //   !inputError.healthScore &&
    //   !inputError.image
    // ) {
    // post request dispatch
    // } else {
    setInputError({
      ...inputError,
      sumbit: `Please check all fields before submiting`,
    });
    // }
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
  const handleDietChange = e => {
    let { name } = e.target;
    !input.diets.includes(name)
      ? setInput(prev => {
          return {
            ...prev,
            diets: [...prev.diets, name],
          };
        })
      : setInput(prev => {
          return {
            ...prev,
            diets: prev.diets.filter(diet => diet !== name),
          };
        });
  };

  
  return (
    <main className={s.container}>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={e => handleChange(e)}
          />
          {inputError.title && <p>{inputError.title}</p>}
        </div>
        <div>
          <label>Summary</label>
          <textarea
            type="text"
            name="summary"
            value={input.summary}
            onChange={e => handleChange(e)}
          ></textarea>
          {inputError.summary && <p>{inputError.summary}</p>}
        </div>
        <div>
          <label>Health Score</label>
          <input
            type="number"
            min="0"
            max="100"
            name="healthScore"
            value={input.healthScore}
            onChange={e => handleChange(e)}
          />
          {inputError.healthScore && <p>{inputError.healthScore}</p>}
        </div>
        <div>
          <label>Steps</label>
          <div>
            <input
              type="text"
              name={'stepInput'}
              value={stepInput}
              onChange={e => handleStepChange(e)}
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
        <div>
          <label>Diets</label>
          {inputError.diets && <p>{inputError.diets}</p>}
          <ul>
            {diets.map((diet, idx) => {
              return (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id={idx}
                    name={diet}
                    value={diet}
                    onChange={e => handleDietChange(e)}
                  />
                  <label htmlFor={idx}>{diet}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <label>Image</label>
          <input type="url" name="image" onChange={e => handleChange(e)} />
          {inputError.image && <p>{inputError.image}</p>}
        </div>
        <input type="submit" value="Create Recipe" />
      </form>
      <div>
        <img src={input.image} alt="your-recipe" />
      </div>
    </main>
  );
};

export default Form;
