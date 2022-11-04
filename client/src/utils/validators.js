export const nameValidator = name => {
  let errorMsg = '';
  const nameRegex = /^([a-zA-Z ]+)$/i;
  if (!name) {
    errorMsg = 'Enter a valid name for your recipe';
  }
  if (name && !nameRegex.test(name)) {
    errorMsg = 'Special characters are not allowed';
  }
  return errorMsg;
};

export const healthScoreValidator = healthScore => {
  let errorMsg = '';
  if (parseInt(healthScore) < 0 || parseInt(healthScore) > 100) {
    errorMsg = 'It must be a number between 0 and 100';
  }
  if (!Number(healthScore)) {
    errorMsg = 'It must be a number';
  }
  return errorMsg;
};

export const summaryValidator = summary => {
  let errorMsg = '';
  if (!summary) {
    errorMsg = 'Give a short summary about your recipe';
  }
  return errorMsg;
};

export const imageValidator = imageUrl => {
  let errorMsg = '';
  const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;
  if (!imageUrl) {
    errorMsg = 'Enter a valid image url';
  }
  if (imageUrl && !imageRegex.test(imageUrl)) {
    errorMsg = 'The image needs to come from a valid url';
  }
  return errorMsg;
};
