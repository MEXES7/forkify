import View from './view.js';
import PreviewView from './previewView.js';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No bookmarks yet`;
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(bookmark => PreviewView.render(bookmark, false)).join(' ');

       
    }

}

export default new BookmarksView ();