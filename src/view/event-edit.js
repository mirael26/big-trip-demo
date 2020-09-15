import {getPreposition, getCurrentDate, completeDateNubmer} from "../utils/event.js";
import {capitalizeFirst} from "../utils/common.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const.js";
import AbstractView from "./abstract.js";

export default class EventEdit extends AbstractView {
  constructor(eventData) {
    super();
    this._data = EventEdit.parseEventToData(eventData);
    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  _getEventEditDate(date) {
    return `${completeDateNubmer(date.getDate())}/${completeDateNubmer(date.getMonth())}/${completeDateNubmer(date.getFullYear())}
 ${completeDateNubmer(date.getHours())}:${completeDateNubmer(date.getMinutes())}`;
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
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
        </div>`).join(``)}
    </fieldset>`).join(``)}

    </div>
  </div>`;
  }

  _createOfferTemplate(checkedOffers, currentType) {

    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${OFFERS.find((element) => {
    return element.type === currentType;
  }).offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.short}-1" type="checkbox" name="event-offer-${offer.short}" ${checkedOffers.includes(offer) ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.short}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </section>`;
  }

  _createDestinationTemplate(destinationInfo) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationInfo.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destinationInfo.photo.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
      </div>
    </div>
  </section>`;
  }

  _createFavoriteButtonTemplate(isFavorite, isNewEvent) {
    return isNewEvent ? `` : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`;
  }

  _createCloseButtonTemplate(isNewEvent) {
    return isNewEvent ? `` : `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`;
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
      isFavorite = false,
      isDestination,
      isNewEvent,
    } = this._data;

    const typeTemplate = this._createTypeTemplate(type);
    const offerTemplate = this._createOfferTemplate(offers, type);
    const destinationTemplate = this._createDestinationTemplate(destinationInfo);
    const favoriteButtonTemplate = this._createFavoriteButtonTemplate(isFavorite, isNewEvent);
    const closeButtonTemplate = this._createCloseButtonTemplate(isNewEvent);

    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${typeTemplate}

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirst(type)} ${getPreposition(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=" ${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${DESTINATIONS.map((city) => `<option value="${city}"></option>`).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._getEventEditDate(startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._getEventEditDate(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${isNewEvent ? `Cancel` : `Delete`}</button>

        ${favoriteButtonTemplate}
        ${closeButtonTemplate}
      </header>
      <section class="event__details">
        ${offerTemplate}
        ${isDestination ? destinationTemplate : ``}
      </section>
      </form>`
    );
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeToggleHandler);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _closeButtonHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeButtonHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  static parseEventToData(eventData) {
    return Object.assign(
        {},
        eventData,
        {
          isDestination: eventData.destination !== ``,
          isNewEvent: Object.keys(eventData).length === 0 ? true : false,
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDestination;
    delete data.isNewEvent;

    return data;
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }
}
