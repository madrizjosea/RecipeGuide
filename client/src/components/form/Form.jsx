import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets } from '../../redux/actions';
// import { Link } from 'react-router-dom';

const Form = () => {

  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // Initial states
  const [stepInput, setStepInput] = useState('');
  const [state, setState] = useState({
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
    setState(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {};

  // Step creation handlers
  const handleStepChange = e => {
    let { value } = e.target;
    setStepInput(value);
  };

  const handleStepSubmit = e => {
    e.preventDefault();
    setState(prev => {
      return {
        ...prev,
        steps: [...prev.steps, stepInput],
      };
    });
    setStepInput('');
  };

  const deleteStep = (e, id) => {
    e.preventDefault();
    setState(prev => {
      return {
        ...prev,
        steps: prev.steps.filter((step, idx) => idx !== id),
      };
    });
  };

  // Diets handler
  const handleDietChange = e => {
    let { name } = e.target;
    !state.diets.includes(name)
      ? setState(prev => {
          return {
            ...prev,
            diets: [...prev.diets, name],
          };
        })
      : setState(prev => {
          return {
            ...prev,
            diets: prev.diets.filter(diet => diet !== name),
          };
        });
  };

  console.log('This is the state\n', state);

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Summary</label>
        <textarea
          name="summary"
          value={state.summary}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Health Score</label>
        <input
          type="number"
          name="healthScore"
          value={state.healthScore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Steps</label>
        <div>
          <input
            type="text"
            name={'stepInput'}
            value={stepInput}
            onChange={handleStepChange}
          />
          <button onClick={e => handleStepSubmit(e)}>+</button>
          {state.steps.map((step, idx) => (
            <div key={idx}>
              {step}
              <button onClick={e => deleteStep(e, idx)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>Diets</label>
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
        <img src={state.image} alt="your-recipe" />
      </div>
      <div>
        <label>Image</label>
        <input type="url" name="image" onChange={handleChange} />
      </div>
      <button>Create recipe</button>
    </form>
  );
};

export default Form;
