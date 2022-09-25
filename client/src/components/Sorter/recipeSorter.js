export const recipeSorter = (recipes, value) => {
  console.log(value)
  switch (value) {
    case 'A-Z':
      let sortedAlphaAsc = recipes.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() > a.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      return sortedAlphaAsc;
    case 'Z-A':
      let sortedAlphaDesc = recipes.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        if (b.name.toLowerCase() < a.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      return sortedAlphaDesc;
    case '0-100':
      let sortedScoreAsc = recipes.sort((a, b) => {
        return a.healthScore - b.healthScore;
      });
      return sortedScoreAsc;
    case '100-0':
      let sortedScoreDesc = recipes.sort((a, b) => {
        return b.healthScore - a.healthScore;
      });
      return sortedScoreDesc;
    default:
      break;
  }
};
