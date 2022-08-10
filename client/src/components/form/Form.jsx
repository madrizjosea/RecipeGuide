import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
  const [steps, setSteps] = useState([]);
  const diets = ['lacto ovo vegetarian', 'whole 30', 'pescatarian'];

  const addStep = e => {
    e.preventDefault();
    setSteps([...steps, <input type="text" />]);
  };

  const deleteStep = (e, id) => {
    e.preventDefault();
    setSteps(steps.filter((step, idx) => idx !== id));
  };

  return (
    <>
      <Link to={'/recipes'}>
        <button>Home</button>
      </Link>
      <button>Reset fields</button>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>Summary: </label>
          <textarea></textarea>
        </div>
        <div>
          <label>Steps: </label>
          <button onClick={e => addStep(e)}>Step +</button>
          {steps?.map((step, idx) => (
            <div key={idx}>
              <input type="text" />
              <button onClick={e => deleteStep(e, idx)}>X</button>
            </div>
          ))}
        </div>
        <div>
          <label>Diets: </label>
          <select name="diets">
            {diets.map((diet, idx) => (
              <option key={idx} value={diet}>
                {diet.charAt(0).toUpperCase() + diet.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image: </label>
          <input type="url" name="image" />
        </div>
        <button>Create recipe</button>
      </form>
    </>
  );
};

export default Form;
