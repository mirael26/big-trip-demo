import AbstractView from "./abstract.js";
import {capitalizeFirst} from "../utils/common.js";
import {FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Filter extends AbstractView {
  constructor(checkedFilter, eventsModel) {
    super();
    this._events = eventsModel.getEvents();
    this._checkedFilter = checkedFilter;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _createFilterItemTemplate(currentFilter, checkedFilter) {
    const isDisabled = !filter[currentFilter](this._events).length > 0;
    return `<div class="trip-filters__filter">
    <input id="filter-${currentFilter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${currentFilter}"${currentFilter === checkedFilter ? ` checked` : ``}${isDisabled ? ` disabled` : ``}>
    <label class="trip-filters__filter-label" for="filter-${currentFilter}">${capitalizeFirst(currentFilter)}</label>
  </div>`;
  }


  _getTemplate() {
    return (
      `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object
          .values(FilterType)
          .map((currentFilter) => {
            return this._createFilterItemTemplate(currentFilter, this._checkedFilter);
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
