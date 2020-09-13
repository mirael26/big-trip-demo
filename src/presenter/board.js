import SortView from "../view/sort.js";
import EventListView from "../view/event-list.js";
import EventDayView from "../view/event-day.js";
import EventDayListView from "../view/event-day-list.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "./event.js";
import {render} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {sortEventsByDays, sortEventsByTime, sortEventsByPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};

    this._eventListComponent = new EventListView();
    this._noEventsComponent = new NoEventsView();
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEventsList = tripEvents;
    this._tripEventsByDays = sortEventsByDays(this._tripEventsList);
    this._tripEvents = this._tripEventsByDays;

    this._renderBoard();
  }

  _handleEventChange(updatedEvent) {
    this._tripEventsList = updateItem(this._tripEventsList, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents = new Map().set(``, (this._tripEventsList.sort(sortEventsByTime)));
        break;
      case SortType.PRICE:
        this._tripEvents = new Map().set(``, (this._tripEventsList.sort(sortEventsByPrice)));
        break;
      default:
        this._tripEvents = this._tripEventsByDays;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearEventList();
    this._renderEventList();
  }

  _renderSort() {
    this._sortComponent = new SortView(this._tripEvents);
    render(this._boardContainer, this._sortComponent, `afterbegin`);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(eventList, event) {
    const eventPresenter = new EventPresenter(eventList, this._handleEventChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
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

  _clearEventList() {
    this._eventListComponent.getElement().innerHTML = ``;
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderBoard() {
    if (this._tripEventsByDays.size === 0) {
      this._noEventsComponent();
      return;
    }

    this._renderSort();
    this._renderEventList();
  }
}
