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
    <div className="form-inputs">

      <div className="form-flex-col">
        <div className="form-split-container">
          <div className="form-flex-col">
            <label htmlFor="name">
              Name <strong style={{ color: '#dc3545' }}>*</strong>
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
            <p className="form-warning-text">{errors?.name}</p>
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
            <p className="form-warning-text">{errors?.healthScore}</p>
          </div>
        </div>

        <div className="form-flex-col">
          <label htmlFor="summary">
            Summary <strong style={{ color: '#dc3545' }}>*</strong>
          </label>
          <textarea
            id="summary"
            name="summary"
            type="text"
            placeholder="This is the best soup in the world!"
            value={data.summary}
            onChange={handleChange}
          />
          <p className="form-warning-text">{errors?.summary}</p>
        </div>

        <div className="form-flex-col">
          <label htmlFor="image">
            Image <strong style={{ color: '#dc3545' }}>*</strong>
          </label>
          <input
            id="image"
            type="url"
            name="image"
            autoComplete="off"
            value={data.image}
            onChange={handleChange}
          />
          <p className="form-warning-text">{errors?.image}</p>
        </div>

        <Diets
          data={data}
          handleDietChange={handleDietChange}
          diets={diets}
          deleteDiet={deleteDiet}
          errors={errors}
        />
      </div>

      <div className="form-flex-col">
        <Steps
          data={data}
          handleStepSubmit={handleStepSubmit}
          deleteStep={deleteStep}
          errors={errors}
        />
      </div>
      
    </div>
  );

  return content;
};

export default FormInputs;
