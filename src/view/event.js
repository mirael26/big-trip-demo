import AbstractView from "./abstract.js";
import {getPreposition, formatTime, formatDuration} from "../utils/event.js";
import {capitalizeFirst} from "../utils/common.js";

const SHOW_OFFER_MAX = 3;

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _createOffersTemplate(offers) {
    return offers.slice(0, SHOW_OFFER_MAX).map((option) =>
      `<li class="event__offer">
        <span class="event__offer-title">${option.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
        </li>`
    ).join(``);
  }

  _getTemplate() {
    const {type, destination, startDate, endDate, price, offers} = this._event;

    const offersTemplate = this._createOffersTemplate(offers);

    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirst(type)} ${getPreposition(type)} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate.toISOString()}">${formatTime(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.toISOString()}">${formatTime(endDate)}</time>
          </p>
          <p class="event__duration">${formatDuration(startDate, endDate)}</p>
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

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}

