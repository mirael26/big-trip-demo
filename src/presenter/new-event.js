import EventEditView from "../view/event-edit.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {getCurrentDate} from "../utils/event.js";
import {UserAction, UpdateType} from "../const.js";

const NEW_EVENT_BLANK = {
  type: `taxi`,
  destination: ``,
  destinationInfo: {
    description: ``,
    photo: ``
  },
  startDate: getCurrentDate(),
  endDate: getCurrentDate(),
  price: ``,
  offers: [],
  isFavorite: false,
  isNewEvent: true
};

export default class NewEvent {
  constructor(tableContainer, changeData, destinationsList, offersList, addNewEventButton) {
    this._tableContainer = tableContainer;
    this._changeData = changeData;
    this._destinationsList = destinationsList;
    this._offersList = offersList;
    this._addNewEventButton = addNewEventButton;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(NEW_EVENT_BLANK, this._destinationsList, this._offersList);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tableContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._addNewEventButton.disabled = true;
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(updatedEvent) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        updatedEvent
    );
  }

  _handleDeleteClick() {
    this._addNewEventButton.disabled = false;
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._addNewEventButton.disabled = false;
      this.destroy();
    }
  }
}
