import SortView from "../view/sort.js";
import EventEditView from "../view/event-edit.js";
import EventListView from "../view/event-list.js";
import EventDayView from "../view/event-day.js";
import EventDayListView from "../view/event-day-list.js";
import EventView from "../view/event.js";
import NoEventsView from "../view/no-events.js";
import {render, replace} from "../utils/render.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._eventListComponent = new EventListView();
    this._noEventsComponent = new NoEventsView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents;

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, new SortView(this._tripEvents), `afterbegin`);
  }

  _renderEvent(eventList, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHadler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventList, eventComponent, `beforeend`);
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventsView(), `afterbegin`);
  }

  _renderEventList() {
    render(this._boardContainer, this._eventListComponent, `beforeend`);

    let mapIndex = 0;
    this._tripEvents.forEach((value, key) => {
      mapIndex++;
      const eventDayComponent = new EventDayView(key, mapIndex);
      render(this._eventListComponent, eventDayComponent, `beforeend`);

      const eventDayListComponent = new EventDayListView();
      render(eventDayComponent, eventDayListComponent, `beforeend`);

      value.forEach((event) => {
        this._renderEvent(eventDayListComponent.getElement(), event);
      });
    });
  }

  _renderBoard() {
    if (this._tripEvents.size === 0) {
      this._noEventsComponent();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}
