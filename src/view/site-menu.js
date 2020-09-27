import AbstractView from "./abstract.js";
import {MenuItem} from "./../const.js";

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _getTemplate() {
    return `<div>
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" id="${MenuItem.TABLE}" href="#">Table</a>
      <a class="trip-tabs__btn" id="${MenuItem.STATISTICS}" href="#">Stats</a>
    </nav>
  </div>`;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const menuElement = this.getElement().querySelector(`[id=${menuItem}]`);
    const checkedMenuElement = this.getElement().querySelector(`.trip-tabs__btn--active`);
    if (menuElement === checkedMenuElement) {
      return;
    }
    checkedMenuElement.classList.remove(`trip-tabs__btn--active`);
    menuElement.classList.add(`trip-tabs__btn--active`);
  }
}
