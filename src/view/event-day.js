import {getShortDate, createElement} from "../util.js";

const createEventDayTemplate = (day, index) => {
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
};

export default class EventDay {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createEventDayTemplate(this._day, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
