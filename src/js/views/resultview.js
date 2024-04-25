import View from './view.js';
import PreviewView from './previewView.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipe found for your query try again!`;
    _message = '';

    
    _generateMarkup() {
      console.log(this._data);
      return this._data.map(result => PreviewView.render(result, false)).join(' ');

     
  }

}
  


export default new ResultsView ();