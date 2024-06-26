export default class View {

    _data;
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    };

    update(data) {
      //if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
      
      this._data = data;
      const newmarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newmarkup);
      const newElement = Array.from(newDOM.querySelectorAll('*'));
      const curElement = Array.from(this._parentElement.querySelectorAll('*'));

      newElement.forEach((newEl, i) => {
        const curEl = curElement[i];
        
        //update changed text
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
          curEl.textContent = newEl.textContent;
        }

        // update changed attribute
        if(!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value))
      
      });

    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderspinner() {
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="http://localhost:1234/icons.21bad73c.svg#icon-loader"></use>
                </svg>
              </div>`
              this._clear();
              this._parentElement.insertAdjacentHTML('afterbegin', markup);
      };

      renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
              <div>
                <svg>
                  <use href="http://localhost:1234/icons.21bad73c.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`
  
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
  
      }
  
      renderMessage(message = this._message) {
        const markup = `
        <div class="message">
              <div>
                <svg>
                  <use href="http://localhost:1234/icons.21bad73c.svg#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`
  
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
  
      }
}