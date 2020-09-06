import AbstractView from "./abstract.js";

export default class TripControls extends AbstractView {
  _getTemplate() {
    return `<div class="trip-main__trip-controls  trip-controls"></div>`;
  }
}
