import { useState } from 'react';

const Steps = ({ data, handleStepSubmit, deleteStep }) => {
  const [step, setStep] = useState('');

  const handleStep = () => {
    handleStepSubmit(step);
    setStep('');
  };

  const content = (
    <>
      <div>
        <label htmlFor="steps">
          Intructions <strong style={{ color: '#dc3545' }}>*</strong>
        </label>
        <div className="form-flex-row">
          <input
            id="steps"
            name="step"
            type="text"
            placeholder="Write one step instruction at a time"
            autoComplete="off"
            value={step}
            onChange={e => setStep(e.target.value)}
          />
          <button
            className="form-input-button"
            type="button"
            onClick={() => handleStep(step)}
          >
            +
          </button>
        </div>
      </div>

      {data.steps.map((step, index) => (
        <div className="form-stored-input" key={index}>
          <p>{step}</p>
          <button
            className="form-delete-button"
            type="button"
            onClick={() => deleteStep(index)}
          >
            x
          </button>
        </div>
      ))}
    </>
  );

  return content;
};

export default Steps;
