// Helper functionalities
const axios = require('../../axios');
const { API_KEY } = process.env;

const getByTitle = async title => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${title}`
  );
  return data.results;
};

const getAll = async () => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
  );
  return data.results;
};

const getById = async id => {
  const { data } = await axios.get(
    `${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  return data.results;
};

const getDiets = async () => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
  );
  return data.results;
};

const formater = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    diets: recipe.diets,
    image: recipe.image,
    healthScore: recipe.healthScore,
  };
};

module.exports = {
  formater,
  getAll,
  getByTitle,
  getById,
  getDiets,
};
