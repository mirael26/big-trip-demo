import AbstractView from "./abstract.js";

export default class EventDayList extends AbstractView {
  _getTemplate() {
    return (
      `<ul class="trip-events__list"></ul>`
    );
  }
}
