export const recipeValidator = inputs => {
  // Reggular expresions for testing
  const nameRegex = /^([a-zA-Z ]+)$/i;
  const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  let errorMsgs = {
    name: '',
    summary: '',
    healthScore: '',
    diets: '',
    image: '',
    submit: false,
    submitMsg: '',
  };

  if (!inputs.name) {
    errorMsgs.name = `Introduce a name for your recipe`;
  } else if (inputs.name && !nameRegex.test(inputs.name)) {
    errorMsgs.name = `The name can't contain special characters`;
  } else {
    errorMsgs.name = '';
  }

  if (!inputs.summary) {
    errorMsgs.summary = `Give a short summary about your recipe`;
  } else {
    errorMsgs.summary = '';
  }

  if (inputs.diets.length < 1) {
    errorMsgs.diets = `Your recipe must belong to at least one diet type`;
  } else {
    errorMsgs.diets = '';
  }

  if (!inputs.healthScore) {
    errorMsgs.healthScore = `Give your recipe a health score between 0 and 100`;
  } else if (
    parseInt(inputs.healthScore) < 0 ||
    parseInt(inputs.healthScore) > 100
  ) {
    errorMsgs.healthScore = `The health score must be between 0 and 100`;
  } else {
    errorMsgs.healthScore = '';
  }

  if (inputs.image && !imageRegex.test(inputs.image)) {
    errorMsgs.image = `Introduce a valid image address`;
  } else {
    errorMsgs.image = '';
  }

  if (
    errorMsgs.name ||
    errorMsgs.summary ||
    errorMsgs.diets ||
    errorMsgs.healthScore ||
    errorMsgs.image
  ) {
    errorMsgs.submit = true;
    errorMsgs.submitMsg = `Check all fields before submiting`;
  } else {
    errorMsgs.submit = false;
    errorMsgs.submitMsg = '';
  }

  return errorMsgs;
};
