const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Reading all files in Models folder, then added to the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Pass in the sequelize instance to all models
modelDefiners.forEach(model => model(sequelize));
// Capitalization of all models
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructuring before creating assosiations
const { Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: 'recipes_diets' });
Diet.belongsToMany(Recipe, { through: 'recipes_diets' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
