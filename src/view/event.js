import {getPreposition, completeDateNubmer, createElement} from "../util.js";

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  _createOffersTemplate(offersArray) {
    return offersArray.slice(0, 3).map((option) =>
      `<li class="event__offer">
        <span class="event__offer-title">${option.text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
        </li>`
    ).join(``);
  }

  _getTemplate() {
    const {type, destination, startDate, endDate, price, offers} = this._event;

    const startTimeHours = completeDateNubmer(startDate.getHours());
    const startTimeMinutes = completeDateNubmer(startDate.getMinutes());
    const endTimeHours = completeDateNubmer(endDate.getHours());
    const endTimeMinutes = completeDateNubmer(endDate.getMinutes());
    const duration = (endDate - startDate);

    const convertDuration = (millisec) => {
      let minutes = (millisec / (1000 * 60)).toFixed(0);
      let hours = completeDateNubmer(Math.floor(minutes / 60));
      let days = ``;
      if (hours >= 24) {
        days = completeDateNubmer(Math.floor(hours / 24));
        hours = hours - (days * 24);
      }

      minutes = completeDateNubmer(Math.floor(minutes % 60));
      if (days !== ``) {
        return `${days}D ${hours}H ${minutes}M`;
      } else if (hours > 0) {
        return `${hours}H ${minutes}M`;
      }
      return `${minutes}M`;
    };

    const offersTemplate = this._createOffersTemplate(offers);

    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getPreposition(type)} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate.toISOString()}">${startTimeHours}:${startTimeMinutes}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.toISOString()}">${endTimeHours}:${endTimeMinutes}</time>
          </p>
          <p class="event__duration">${convertDuration(duration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersTemplate}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
      </li>`
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

