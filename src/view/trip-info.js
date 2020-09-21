import AbstractView from "./abstract.js";
import {getShortDate, getEventsInOrder} from "../utils/event.js";

export default class TripInfo extends AbstractView {
  constructor(eventsData) {
    super();
    this._events = eventsData;
  }

  _createRouteTemplate() {
    if (!this._events.length) {
      return ``;
    }

    const events = getEventsInOrder(this._events);
    const destinations = events.map((event) => {
      return event.destination;
    });
    const destinationsUniq = destinations.filter((element, index, array) => {
      return element !== array[index - 1];
    });

    const startDay = events[0].startDate;
    const endDay = events[events.length - 1].endDate.getMonth() === events[0].startDate.getMonth() ? events[events.length - 1].endDate.getDate() : events[events.length - 1].endDate;

    return (
      `<div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsUniq.join(` &mdash; `)}</h1>

      <p class="trip-info__dates">${getShortDate(startDay)}&nbsp;&mdash;&nbsp;${getShortDate(endDay)}</p>
      </div>`
    );
  }

  _createCostTemplate() {
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

  _getTemplate() {
    const routeTemplate = this._createRouteTemplate();
    const costTemplate = this._createCostTemplate();

    return `<section class="trip-main__trip-info  trip-info">
    ${routeTemplate}
    ${costTemplate}
    </section>`;
  }
}
