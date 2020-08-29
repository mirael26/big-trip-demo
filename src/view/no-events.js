import {createElement} from "../util.js";

export default class NoEvents {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return (
      `<p class="trip-events__msg">Click New Event to create your first point</p>`
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
