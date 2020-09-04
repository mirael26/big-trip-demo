import {isNoEvents, getShortDate, createElement} from "../util.js";
import AbstractView from "./abstract.js";

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  _getTemplate() {
    const events = this._events;
    const destinations = events.map((event) => {
      return event.destination;
    });
    const destinationsUniq = destinations.filter((element, index, array) => {
      return element !== array[index - 1];
    });

    const startDay = events[0].startDate;
    const endDay = events[events.length - 1].endDate.getMonth() === events[0].startDate.getMonth() ? events[events.length - 1].endDate.getDate() : events[events.length - 1].endDate;

    return isNoEvents(events) ? `` : (
      `<div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsUniq.join(` &mdash; `)}</h1>

      <p class="trip-info__dates">${getShortDate(startDay)}&nbsp;&mdash;&nbsp;${getShortDate(endDay)}</p>
      </div>`
    );
  }
}
