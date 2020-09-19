import Observer from "../utils/observer.js";

export default class Event extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, updatedItem) {
    const index = this._events.findIndex((event) => event.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      updatedItem,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, updatedItem);
  }

  addEvent(updateType, updatedItem) {
    this._events = [
      updatedItem,
      ...this._events
    ];

    this._notify(updateType, updatedItem);
  }

  deleteEvent(updateType, updatedItem) {
    const index = this._events.findIndex((event) => event.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
