import * as model from './module.js';
//import { modalclose } from './config.js';
import recipeview from './views/recipeview.js';
import searchview from './views/searchview.js';
import recipeview from './views/recipeview.js';
import PaginationView from './views/paginationview.js';
import bookmarkview from './views/bookmarkview.js';
import AddRecipeView from './views/addRecipeView.js';


//import icons from '../img/icons.svg';
//console.log(icons)
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultview from './views/resultview.js';
import paginationview from './views/paginationview.js';
import addRecipeView from './views/addRecipeView.js';

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeview.renderspinner();
    //0) update results view to mark selected search result
    resultview.update(model.getSearchResultPage());
    

     //1) Loading recipe
    await model.loadRecipe(id);
  


  //Rendering recipe
  recipeview.render(model.state.recipe);
 bookmarkview.update(model.state.bookmarks);
} catch (err) {
  console.log(err);
  recipeview.renderError(`We couldn't find that recipe, please try another one`)
}
};


const controlSearchResults = async function() {
  try{
    resultview.renderspinner();

    //GET SEARCH QUERY
    const query = searchview.getQuery();
    if(!query) return;
    //LOAD SEARCH RESULTS
    await model.loadSearchResult(query);
    //RENDER RESULT

    resultview.render(model.getSearchResultPage());

    //Render initial pagination buttons
    PaginationView.render(model.state.search);
  }catch(err) {
    console.log(err)
  }
};

const controlPagination = function(gotoPage) {
   //RENDER new RESULT

   resultview.render(model.getSearchResultPage(gotoPage));

   //render new pagination buttons
   PaginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  //update the recipe servings
  model.updateServings(newServings)
  //update the recipe view
  // recipeview.render(model.state.recipe);
  recipeview.update(model.state.recipe);
};

const controlAddBookmark = function() {
  //Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id);
  //update recipe view
  recipeview.update(model.state.recipe);
  //render bookmarks
  bookmarkview.render(model.state.bookmarks)
}
 const controlBookmarks = function() {
  bookmarkview.render(model.state.bookmarks)
 };

 const controlAddRecipe = async function (newRecipe) {
try{
  //show spinner
  addRecipeView.renderspinner();

  //upload new recipe data
  await model.uploadRecipe(newRecipe)
  //Render recipe
  recipeview.render(model.state.recipe);
  //success message
  addRecipeView.renderMessage();

  //Render bookmark view
  bookmarkview.render(model.state.bookmarks);

  //change id in url
  window.history.pushState(null, '', `#${model.state.recipe.id}`);

  //close form window
  setTimeout(function() {
    addRecipeView.toggleWindow()
  }, 2.5 * 1000);
 }catch(err) {
  addRecipeView.renderError(err.message)
 }}

const init = function() {
  bookmarkview.addHandlerRender(controlBookmarks);
  recipeview.addHandlerRender(controlRecipe);
  recipeview.addHandlerUpdateServings(controlServings);
  recipeview.addHandlerAddBookmark(controlAddBookmark);
  searchview.addHandlerSearch(controlSearchResults);
  paginationview.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // controlServings();
};
init();