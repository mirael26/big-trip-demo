import {isNoEvents, getShortDate, createElement} from "../util.js";

const createTripInfoTemplate = (events) => {
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
};

export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
