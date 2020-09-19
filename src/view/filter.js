import AbstractView from "./abstract.js";
import {capitalizeFirst} from "../utils/common.js";
import {FilterType} from "../const.js";

export default class Filter extends AbstractView {
  constructor(currentFilter) {
    super();
    this._currentFilter = currentFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _createFilterItemTemplate(filter, currentFilter) {
    return `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}"${filter === currentFilter ? ` checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeFirst(filter)}</label>
  </div>`;
  }


  _getTemplate() {
    return (
      `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object
          .values(FilterType)
          .map((filter) => {
            return this._createFilterItemTemplate(filter, this._currentFilter);
          }).join(``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
    );
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector(`.trip-filters`).addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
