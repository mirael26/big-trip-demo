import AbstractView from "./abstract.js";
import {getShortDate} from "../utils/event.js";

export default class EventDay extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  _getTemplate() {
    const day = this._day;
    const index = this._index;
    const date = new Date(day);
    const dateShort = getShortDate(date);

    return (day === ``)
      ? `<li class="trip-days__item  day">
      <div class="day__info"></div>
      </li>`

      : `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index}</span>
          <time class="day__date" datetime="${date.toISOString()}">${dateShort}</time>
        </div>

        </li>`;
  }
}
