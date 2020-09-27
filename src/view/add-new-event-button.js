import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

export default class AddNewEventButton extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _getTemplate() {
    return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" id="${MenuItem.ADD_NEW_EVENT}">New event</button>`;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
