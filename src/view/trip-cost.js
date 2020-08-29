import {createElement} from "../util.js";

const createTripCostTemplate = (events) => {
  let cost = 0;

  events.forEach((event) => {
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
};

export default class TripCost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
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
