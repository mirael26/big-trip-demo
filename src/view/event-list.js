import AbstractView from "./abstract.js";

export default class EventList extends AbstractView {
  _getTemplate() {
    return (
      `<ul class="trip-days"></ul>`
    );
  }
}
