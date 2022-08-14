// Helper functionalities
const axios = require('../../axios');
const { API_KEY } = process.env;

const getByTitle = async title => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${title}&number=100`
  );
  return data.results;
};

const getAll = async () => {
  const { data } = await axios.get(
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
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
    `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
  );
  return data.results;
};

const apiRecipeFormater = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    diets: recipe.diets,
    image: recipe.image,
    healthScore: recipe.healthScore,
  };
};

const dbRecipeFormater = recipe => {
  let parsedDiets = [];
  recipe.diets.forEach(diet => parsedDiets.push(diet.name));
  return {
    id: recipe.id,
    title: recipe.title,
    diets: parsedDiets,
    image: recipe.image,
    healthScore: recipe.healthScore,
  };
};

module.exports = {
  apiRecipeFormater,
  dbRecipeFormater,
  getAll,
  getByTitle,
  getById,
  getDiets,
};
