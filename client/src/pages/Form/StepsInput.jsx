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
          Preparation steps <strong style={{ color: 'red' }}>*</strong>
        </label>
        <input
          id="steps"
          name="step"
          type="text"
          placeholder="Detailed step instructions"
          autoComplete="off"
          value={step}
          onChange={e => setStep(e.target.value)}
        />
        <button type="button" onClick={() => handleStep(step)}>
          +
        </button>
      </div>
      {data.steps.map((step, index) => (
        <div key={index}>
          <p>{step}</p>
          <button type="button" onClick={() => deleteStep(index)}>
            x
          </button>
        </div>
      ))}
    </>
  );

  return content;
};

export default Steps;
