import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// for old browsers support:
import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime/runtime'; // for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // we remove the #

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    // doesnt return anything so it doesnt need to be stored
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    // doesnt return anything so it doesnt need to be stored
    await model.loadSearchResults(query);

    // Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
