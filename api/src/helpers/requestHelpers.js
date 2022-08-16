const axios = require('../axios');
const { API_KEY } = process.env;

const getByName = async name => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${name}&number=20`
  );
  return data.results;
};

const getAll = async () => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`
  );
  return data.results;
};

const getById = async id => {
  const { data } = await axios.get(
    `${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  return data;
};

const getDiets = async () => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`
  );
  return data.results;
};

module.exports = {
  getAll,
  getByName,
  getById,
  getDiets,
};
