import {createElement} from "../util.js";

export default class TripInfoContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
    </section>`;
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
