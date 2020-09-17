import AbstractView from "./abstract.js";
import {getShortDate} from "../utils/event.js";

export default class EventDay extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  _getTemplate() {
    const date = new Date(this._day);
    const dateShort = getShortDate(date);

    return !this._day
      ? `<li class="trip-days__item  day">
      <div class="day__info"></div>
      </li>`

      : `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._index}</span>
          <time class="day__date" datetime="${date.toISOString()}">${dateShort}</time>
        </div>

        </li>`;
  }
}
