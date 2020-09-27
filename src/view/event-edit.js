import {getPreposition, getCurrentDate, formatFullDate} from "../utils/event.js";
import {capitalizeFirst} from "../utils/common.js";
import {EVENT_TYPES} from "../const.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: `taxi`,
  destination: ``,
  startDate: getCurrentDate(),
  endDate: getCurrentDate(),
  price: ``,
  offers: [],
  isFavorite: false,
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT, destinations, offers) {
    super();
    this._event = EventEdit.parseEventToData(event);
    this._datepicker = null;
    this._destinationsList = destinations;
    this._offersList = offers;


    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  _createTypeTemplate(type, isDisabled) {
    return `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"${isDisabled ? ` disabled` : ``}>

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

  _createOfferTemplate(checkedOffers, currentType, isDisabled) {
    const offersOfCurrentType = this._offersList.find((element) => {
      return element.type === currentType;
    }).offers;
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${offersOfCurrentType.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offersOfCurrentType.indexOf(offer)}" type="checkbox" name="event-offer-${offersOfCurrentType.indexOf(offer)}"${checkedOffers.some((checkedOffer) => checkedOffer.title === offer.title) ? ` checked` : ``}${isDisabled ? ` disabled` : ``}>
        <label class="event__offer-label" for="event-offer-${offersOfCurrentType.indexOf(offer)}">
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
        ${destinationInfo.photo.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join(``)}
      </div>
    </div>
  </section>`;
  }

  _createFavoriteButtonTemplate(isFavorite, isNewEvent, isDisabled) {
    return isNewEvent ? `` : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}${isDisabled ? ` disabled` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`;
  }

  _createCloseButtonTemplate(isNewEvent, isDisabled) {
    return isNewEvent ? `` : `<button class="event__rollup-btn" type="button"${isDisabled ? ` disabled` : ``}>
    <span class="visually-hidden">Open event</span>
  </button>`;
  }

  reset(event) {
    this.updateData(
        EventEdit.parseEventToData(event)
    );
  }

  _getTemplate() {
    const {
      type,
      destination,
      destinationInfo,
      startDate,
      endDate,
      price,
      offers,
      isFavorite,
      isDestination,
      isNewEvent,
      isDisabled,
      isSaving,
      isDeleting
    } = this._event;

    const typeTemplate = this._createTypeTemplate(type, isDisabled);
    const offerTemplate = this._createOfferTemplate(offers, type, isDisabled);
    const destinationTemplate = isDestination ? this._createDestinationTemplate(destinationInfo) : ``;
    const favoriteButtonTemplate = this._createFavoriteButtonTemplate(isFavorite, isNewEvent, isDisabled);
    const closeButtonTemplate = this._createCloseButtonTemplate(isNewEvent, isDisabled);

    const isSubmitDisabled = this._event.startDate > this._event.endDate || !this._destinationsList.some((destinationItem) => destinationItem.name === this._event.destination);
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${typeTemplate}

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirst(type)} ${getPreposition(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1" pattern="${this._destinationsList.map((destinationItem) => destinationItem.name).join(`|`)}"${isDisabled ? ` disabled` : ``}>
          <datalist id="destination-list-1">
            ${this._destinationsList.map((destinationItem) => `<option value="${destinationItem.name}"></option>`).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatFullDate(startDate)}"${isDisabled ? ` disabled` : ``}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatFullDate(endDate)}"${isDisabled ? ` disabled` : ``}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" required${isDisabled ? ` disabled` : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? `disabled` : ``}>${isSaving ? `Saving` : `Save`}</button>
        <button class="event__reset-btn" type="reset">${isNewEvent ? `Cancel` : `${isDeleting ? `Deliting` : `Delete`}`}</button>

        ${favoriteButtonTemplate}
        ${closeButtonTemplate}
      </header>
      <section class="event__details">
        ${offerTemplate}
        ${destinationTemplate}
      </section>
      </form>`
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    if (this._event.isNewEvent) {
      return;
    }
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setDatepicker() {
    if (this._startDatepicker || this._endDatepicker) {
      this._startDatepicker.destroy();
      this._endDatepicker.destroy();
      this._startDatepicker = null;
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._event.startDate,
          onChange: this._startDateChangeHandler
        }
    );

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._event.endDate,
          onChange: this._endDateChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeToggleHandler);
    this.getElement()
        .querySelector(`.event__input--destination`)
        .addEventListener(`change`, this._destinationChangeHandler);
    this.getElement()
      .querySelector(`.event__section--offers`)
      .addEventListener(`change`, this._offerToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: []
    });
  }

  _offerToggleHandler(evt) {
    evt.preventDefault();
    const targetOffer = evt.target.nextElementSibling.querySelector(`.event__offer-title`).textContent;
    const newOffer = this._offersList.find((element) => {
      return element.type === this._event.type;
    }).offers
      .find((element) => {
        return element.title === targetOffer;
      });
    if (this._event.offers.some((offer) => offer.title === newOffer.title)) {
      this._event.offers = this._event.offers.filter((offer) => {
        return offer.title !== newOffer.title;
      });
    } else {
      this._event.offers.push(newOffer);
    }

    this.updateData({
      offers: this._event.offers
    }, true);
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const currentDestination = this._destinationsList.find((destination) => evt.target.value === destination.name);

    this.updateData({
      destination: evt.target.value,
      destinationInfo: {
        description: currentDestination.description,
        photo: currentDestination.pictures
      },
      isDestination: evt.target.value ? true : false
    });
  }

  _startDateChangeHandler(selectedDates) {
    this.updateData({
      startDate: selectedDates[0]
    });
  }

  _endDateChangeHandler(selectedDates) {
    this.updateData({
      endDate: selectedDates[0]
    });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();

    this.updateData({
      price: parseInt(evt.target.value, 10)
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._event));
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._event));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          offers: event.offers.slice(),
          isDestination: event.destination !== ``,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(event) {
    event = Object.assign(
        {},
        event,
        {
          offers: event.offers.slice()
        }
    );

    delete event.isDestination;
    delete event.isNewEvent;
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }
}
