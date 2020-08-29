import {createElement} from "../util.js";

export default class EventDayList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<ul class="trip-events__list"></ul>`
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
