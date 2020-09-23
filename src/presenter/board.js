import SortView from "../view/sort.js";
import LoadingView from "../view/loading.js";
import EventListView from "../view/event-list.js";
import EventDayView from "../view/event-day.js";
import EventDayListView from "../view/event-day-list.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter from "./event.js";
import NewEventPresenter from "./new-event.js";
import {render, remove} from "../utils/render.js";
import {sortEventsByDays, sortEventsByTime, sortEventsByPrice} from "../utils/event.js";
import {SortType, UserAction, UpdateType, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Trip {
  constructor(boardContainer, eventsModel, filterModel, api) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._isLoading = true;
    this._api = api;
    this._isDestinationLoaded = false;
    this._isOffersLoaded = false;
    this._isEventsLoaded = false;

    this._sortComponent = null;

    this._eventListComponent = new EventListView();
    this._noEventsComponent = new NoEventsView();
    this._loadingComponent = new LoadingView();
    this._eventDayComponents = [];
    this._eventDayListComponents = [];
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._boardHandleModelChange = this._boardHandleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._boardHandleModelChange);
    this._filterModel.addObserver(this._boardHandleModelChange);

    this._newEventPresenter = null;
  }

  init() {

    this._renderBoard();
  }

  createEvent() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newEventPresenter = new NewEventPresenter(this._eventListComponent, this._handleViewAction, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
    this._newEventPresenter.init();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return new Map().set(``, (filtredEvents.sort(sortEventsByTime)));
      case SortType.PRICE:
        return new Map().set(``, (filtredEvents.sort(sortEventsByPrice)));
    }

    return sortEventsByDays(filtredEvents);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, updatedItem) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, updatedItem);
        this._api.updateEvent(updatedItem).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        });
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, updatedItem);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, updatedItem);
        break;
    }
  }

  _boardHandleModelChange(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard(true);
        this._renderBoard();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._isDestinationLoaded = true;
        if (this._isEventsLoaded && this._isOffersLoaded) {
          this._loadBoard();
        }
        break;
      case UpdateType.INIT_OFFERS:
        this._isOffersLoaded = true;
        if (this._isDestinationLoaded && this._isEventsLoaded) {
          this._loadBoard();
        }
        break;
      case UpdateType.INIT:
        this._isEventsLoaded = true;
        if (this._isDestinationLoaded && this._isOffersLoaded) {
          this._loadBoard();
        }
        break;
    }
  }

  _loadBoard() {
    this._isLoading = false;
    remove(this._loadingComponent);
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEventList(this._getEvents());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, `afterbegin`);
  }

  _renderEvent(eventList, event) {
    const eventPresenter = new EventPresenter(eventList, this._handleViewAction, this._handleModeChange, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, `afterbegin`);
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventsComponent, `afterbegin`);
  }

  _renderEventList(events) {
    render(this._boardContainer, this._eventListComponent, `beforeend`);

    let mapIndex = 0;
    events.forEach((value, key) => {
      mapIndex++;
      const eventDayComponent = new EventDayView(key, mapIndex);
      this._eventDayComponents.push(eventDayComponent);
      render(this._eventListComponent, eventDayComponent, `beforeend`);

      const eventDayListComponent = new EventDayListView();
      this._eventDayListComponents.push(eventDayListComponent);
      render(eventDayComponent, eventDayListComponent, `beforeend`);

      value.forEach((event) => {
        this._renderEvent(eventDayListComponent.getElement(), event);
      });
    });
  }

  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._eventDayComponents.forEach((component) => remove(component));
    this._eventDayComponents = [];
    this._eventDayListComponents.forEach((component) => remove(component));
    this._eventDayListComponents = [];
  }

  _clearBoard(resetSortType = false) {
    this._clearEventList();

    remove(this._sortComponent);
    remove(this._noEventsComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getEvents().size) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventList(this._getEvents());
  }
}
