export default function inputValidator(inputs) {
  // Reggular expresions for testing
  const nameRegex = /^([a-zA-Z ]+)$/i;
  const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  let errorMsgs = {
    name: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: '',
    image: '',
  };

  if (inputs.name && !nameRegex.test(inputs.name)) {
    errorMsgs.name = `The name can't contain special characters`;
  } else {
    errorMsgs.name = '';
  }

  if (!inputs.summary) {
    errorMsgs.summary = `Give a short summary about your recipe`;
  } else {
    errorMsgs.summary = '';
  }

  if (!inputs.diets.length) {
    errorMsgs.diets = `Your recipe must have at least one related diet`;
  } else {
    errorMsgs.diets = '';
  }

  if (
    typeof parseInt(inputs.healthScore) !== 'number' ||
    parseInt(inputs.healthScore) < 0 ||
    parseInt(inputs.healthScore) > 100
  ) {
    errorMsgs.healthScore = 'Health Score must be a number between 0 and 100';
  } else {
    errorMsgs.healthScore = '';
  }

  if (inputs.image && !imageRegex.test(inputs.image)) {
    errorMsgs.image = 'The image needs to come from a valid url';
  } else {
    errorMsgs.image = '';
  }

  return errorMsgs;
}
