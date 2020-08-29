import {createElement} from "../util.js";

export default class EventList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<ul class="trip-days"></ul>`
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
