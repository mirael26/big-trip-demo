import Observer from "../utils/observer.js";

export default class Event extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();
    this._notify(updateType);
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

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          destination: event.destination.name,
          destinationInfo: {
            description: event.destination.description,
            photo: event.destination.pictures
          },
          startDate: event.date_from ? new Date(event.date_from) : ``,
          endDate: event.date_to ? new Date(event.date_to) : ``,
          isFavorite: event.is_favorite,
          price: event.base_price
        }
    );

    delete adaptedEvent.destination.name;
    delete adaptedEvent.destination.description;
    delete adaptedEvent.destination.pictures;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;
    delete adaptedEvent.base_price;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "destination": {
            "description": event.destinationInfo.description,
            "name": event.destination,
            "pictures": event.destinationInfo.photo
          },
          "date_from": event.startDate instanceof Date ? event.startDate.toISOString() : ``,
          "date_to": event.endDate instanceof Date ? event.endDate.toISOString() : ``,
          "is_favorite": event.isFavorite,
          "base_price": event.price
        }
    );

    delete adaptedEvent.destinationInfo;
    delete adaptedEvent.startDate;
    delete adaptedEvent.endDate;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.price;

    return adaptedEvent;
  }
}
