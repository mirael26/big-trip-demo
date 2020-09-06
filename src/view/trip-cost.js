import AbstractView from "./abstract.js";

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
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
}
