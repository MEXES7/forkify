import View from './view.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;

            const gotoPage = +btn.dataset.goto;

            handler(gotoPage);
        })
    }

    _generateMarkup() {
        const curpage = this._data.page;
        const numpages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        //page 1, and  there are other pages
        if(curpage === 1 && numpages > 1) {
            return `<button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curpage + 1}</span>
            <svg class="search__icon">
              <use href="http://localhost:1234/icons.21bad73c.svg#icon-arrow-right"></use>
            </svg>
          </button>`
        }

        //page 1, and there are NO other pages


        //last page
        if(curpage === numpages && numpages > 1 ){
            return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="http://localhost:1234/icons.21bad73c.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage - 1}</span>
          </button>`
        }
        
        //other pages
        if(curpage < numpages) {
            return `<button data-goto="${curpage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="http://localhost:1234/icons.21bad73c.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage - 1}</span>
          </button>
          
          <button data-goto="${curpage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curpage + 1}</span>
            <svg class="search__icon">
              <use href="http://localhost:1234/icons.21bad73c.svg#icon-arrow-right"></use>
            </svg>
          </button>`
        }
    }
};

export default new PaginationView();
