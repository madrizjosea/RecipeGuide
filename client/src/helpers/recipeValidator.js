export const recipeValidator = inputs => {
  // Reggular expresions for testing
  const titleRegex = /^([a-zA-Z ]+)$/i;
  const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  let errorMsgs = {
    title: '',
    summary: '',
    healthScore: '',
    diets: '',
    image: '',
  };

  if (!inputs.title) {
    errorMsgs.title = `Introduce a title for your recipe`;
  } else if (inputs.title && !titleRegex.test(inputs.title)) {
    errorMsgs.title = `The title can't contain special characters`;
  } else {
    errorMsgs.title = '';
  }

  if (!inputs.summary) {
    errorMsgs.summary = `Give a short summary about your recipe`;
  } else {
    errorMsgs.summary = '';
  }

  if (!inputs.diets.length) {
    errorMsgs.diets = `Your recipe must belong to at least one diet type`;
  } else {
    errorMsgs.diets = '';
  }

  if (parseInt(inputs.healthScore) < 0 || parseInt(inputs.healthScore) > 100) {
    errorMsgs.healthScore = `Give your recipe a health score between 0 and 100`
  } else {
    errorMsgs.healthScore = '';
  }

  if (inputs.image && !imageRegex.test(inputs.image)) {
    errorMsgs.image = `Introduce a valid image address`;
  } else {
    errorMsgs.image = '';
  }

  return errorMsgs;
};
