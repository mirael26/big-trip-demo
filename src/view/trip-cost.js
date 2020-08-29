import {createElement} from "../util.js";

export default class TripCost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  _getTemplate() {
    let cost = 0;

    this._events.forEach((event) => {
      cost += event.price;
      if (event.offers.length !== 0) {
        event.offers.forEach((offer) => {
          cost += offer.price;
        });
      }
    });

    return (
      `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>`
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
