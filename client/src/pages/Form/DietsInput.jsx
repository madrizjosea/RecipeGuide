const Diets = ({ data, diets, handleDietChange, deleteDiet, errors }) => {
  const content = (
    <>
      <label htmlFor="diets">
        Related diets <strong style={{ color: 'red' }}>*</strong>
      </label>
      <select id="diets" name="diets" onChange={e => handleDietChange(e)}>
        <option label="-- Select a diet --" value="" />
        {diets.map((diet, idx) => (
          <option key={idx} value={diet}>
            {diet}
          </option>
        ))}
      </select>
      <p>{errors?.diets}</p>
      {data.diets.map((diet, idx) => (
        <div key={idx}>
          {diet.charAt(0).toUpperCase() + diet.slice(1)}
          <button type="button" onClick={() => deleteDiet(idx)}>
            x
          </button>
        </div>
      ))}
    </>
  );

  return content;
};

export default Diets;
