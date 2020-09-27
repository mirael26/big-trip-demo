import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._changedEvent = {};
  }

  updateData(updatedItem, justDataUpdating) {
    if (!updatedItem) {
      return;
    }

    this._event = Object.assign(
        {},
        this._event,
        updatedItem
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
