import {getShortDate, createElement} from "../util.js";

export default class EventDay {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  _getTemplate() {
    const day = this._day;
    const index = this._index;
    const date = new Date(day);
    const dateShort = getShortDate(date);

    return (
      `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${date.toISOString()}">${dateShort}</time>
      </div>

      </li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
