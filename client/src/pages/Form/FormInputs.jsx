import Diets from './DietsInput.jsx';
import Steps from './StepsInput.jsx';

const FormInputs = ({
  data,
  diets,
  handleChange,
  handleStepSubmit,
  deleteStep,
  handleDietChange,
  deleteDiet,
  errors,
}) => {
  const content = (
    <div className="form-flex-col">
      <div className="form-split-container">
        <div className="form-flex-col">
          <label htmlFor="name">
            Name <strong style={{ color: 'red' }}>*</strong>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Grandma's onion sup"
            autoComplete="off"
            value={data.name}
            onChange={handleChange}
          />
          <p>{errors?.name}</p>
        </div>
        <div className="form-flex-col">
          <label htmlFor="healthScore">Health Score</label>
          <input
            id="healthScore"
            name="healthScore"
            type="text"
            placeholder="75"
            autoComplete="off"
            value={data.healthScore}
            onChange={handleChange}
          />
          <p>{errors?.healthScore}</p>
        </div>
      </div>

      <label htmlFor="summary">
        Summary <strong style={{ color: 'red' }}>*</strong>
      </label>
      <textarea
        id="summary"
        name="summary"
        type="text"
        placeholder="This is the best soup in the world!"
        value={data.summary}
        onChange={handleChange}
      />
      <p>{errors?.summary}</p>

      <label htmlFor="image">
        Image <strong style={{ color: 'red' }}>*</strong>
      </label>
      <input
        id="image"
        type="url"
        name="image"
        autoComplete="off"
        value={data.image}
        onChange={handleChange}
      />
      <p>{errors?.image}</p>

      <Steps
        data={data}
        handleStepSubmit={handleStepSubmit}
        deleteStep={deleteStep}
        errors={errors}
      />

      <Diets
        data={data}
        handleDietChange={handleDietChange}
        diets={diets}
        deleteDiet={deleteDiet}
        errors={errors}
      />
    </div>
  );

  return content;
};

export default FormInputs;
