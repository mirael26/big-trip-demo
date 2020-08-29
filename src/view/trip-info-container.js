import {createElement} from "../util.js";

const createTripInfoContainerTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
    </section>`;
};

export default class TripInfoContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoContainerTemplate();
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
