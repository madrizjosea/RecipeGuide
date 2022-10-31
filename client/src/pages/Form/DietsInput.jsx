const Diets = ({ data, diets, handleDietChange, deleteDiet, errors }) => {
  const content = (
    <>
      <label htmlFor="diets">
        Diets <strong style={{ color: '#dc3545' }}>*</strong>
      </label>
      <select id="diets" name="diets" onChange={e => handleDietChange(e)}>
        <option label="-- You can select more than one diet --" value="" />
        {diets.map((diet, idx) => (
          <option key={idx} value={diet}>
            {diet}
          </option>
        ))}
      </select>
      <p className="form-warning-text">{errors?.diets}</p>

      {data.diets.map((diet, idx) => (
        <div className="form-stored-input" key={idx}>
          <p>{diet.charAt(0).toUpperCase() + diet.slice(1)}</p>
          <button
            className="form-delete-button"
            type="button"
            onClick={() => deleteDiet(idx)}
          >
            x
          </button>
        </div>
      ))}
    </>
  );

  return content;
};

export default Diets;
