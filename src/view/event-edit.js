import {getPreposition, getCurrentDate, completeDateNubmer, createElement} from "../util.js";
import {EVENT_TYPES, DESTINATIONS} from "../const.js";
import AbstractView from "./abstract.js";

const getEventEditDate = (date) => {
  return `${completeDateNubmer(date.getDate())}/${completeDateNubmer(date.getMonth())}/${completeDateNubmer(date.getFullYear())}
 ${completeDateNubmer(date.getHours())}:${completeDateNubmer(date.getMinutes())}`;
};

export default class EventEdit extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  _createTypeTemplate(type) {
    return `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      ${Object.keys(EVENT_TYPES).map((key) => `<fieldset class="event__type-group">
      <legend class="visually-hidden">${key}</legend>

      ${EVENT_TYPES[key].map((eventType) => `<div class="event__type-item">
        <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}">
        <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
        </div>`).join(``)}
    </fieldset>`).join(``)}

    </div>
  </div>`;
  }

  _createOfferTemplate(offers) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}" checked>
        <label class="event__offer-label" for="event-offer-${offer.name}-1">
          <span class="event__offer-title">${offer.text}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </section>`;
  }

  _createDestinationTemplate(destinationInfo) {
    return destinationInfo === `` ? `` : `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationInfo.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destinationInfo.photo.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
      </div>
    </div>
  </section>`;
  }

  _getTemplate() {
    const {
      type = `Bus`,
      destination = ``,
      destinationInfo = ``,
      startDate = getCurrentDate(),
      endDate = getCurrentDate(),
      price = ``,
      offers = ``,
    } = this._event;

    const typeTemplate = this._createTypeTemplate(type);
    const offerTemplate = this._createOfferTemplate(offers);
    const destinationTemplate = this._createDestinationTemplate(destinationInfo);

    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${typeTemplate}

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${getPreposition(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=" ${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${DESTINATIONS.map((city) => `<option value="${city}"></option>`)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getEventEditDate(startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getEventEditDate(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offerTemplate}
        ${destinationTemplate}
      </section>
      </form>`
    );
  }
}
