import SortView from "../view/sort.js";
import LoadingView from "../view/loading.js";
import EventListView from "../view/event-list.js";
import EventDayView from "../view/event-day.js";
import EventDayListView from "../view/event-day-list.js";
import NoEventsView from "../view/no-events.js";
import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import NewEventPresenter from "./new-event.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {sortEventsByDays, sortEventsByTime, sortEventsByPrice} from "../utils/event.js";
import {SortType, UserAction, UpdateType, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Table {
  constructor(tableContainer, eventsModel, filterModel, api, addNewEventButton) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tableContainer = tableContainer;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {};
    this._isLoading = true;
    this._api = api;
    this._isDestinationLoaded = false;
    this._isOffersLoaded = false;
    this._isEventsLoaded = false;
    this._addNewEventButton = addNewEventButton;

    this._sortComponent = null;

    this._eventListComponent = new EventListView();
    this._noEventsComponent = new NoEventsView();
    this._loadingComponent = new LoadingView();
    this._eventDayComponents = [];
    this._eventDayListComponents = [];
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._tableHandleModelChange = this._tableHandleModelChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


    this._newEventPresenter = null;
  }

  init() {

    this._tableContainer.style = `display: block`;
    this._renderTable();
    this._eventsModel.addObserver(this._tableHandleModelChange);
    this._filterModel.addObserver(this._tableHandleModelChange);
  }

  destroy() {
    this._clearTable();
    remove(this._eventListComponent);
    this._tableContainer.style = `display: none`;

    this._eventsModel.removeObserver(this._tableHandleModelChange);
    this._filterModel.removeObserver(this._tableHandleModelChange);
  }

  createEvent() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this._newEventPresenter = new NewEventPresenter(this._tableContainer, this._handleViewAction, this._eventsModel.getDestinations(), this._eventsModel.getOffers(), this._addNewEventButton);
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
        this._eventPresenter[updatedItem.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(updatedItem).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
        .catch(() => {
          this._eventPresenter[updatedItem.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
      case UserAction.UPDATE_WITHOUT_RELOAD:
        this._api.updateEvent(updatedItem).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
        .catch(() => {
          this._eventPresenter[updatedItem.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_EVENT:
        this._newEventPresenter.setSaving();
        this._api.addEvent(updatedItem).then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
        .catch(() => {
          this._newEventPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[updatedItem.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(updatedItem).then(() => {
          this._eventsModel.deleteEvent(updateType, updatedItem);
        })
        .catch(() => {
          this._eventPresenter[updatedItem.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _tableHandleModelChange(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTable(true);
        this._renderTable();
        this._addNewEventButton.disabled = false;
        break;
      case UpdateType.MAJOR:
        this._clearTable(true);
        this._renderTable();
        this._addNewEventButton.disabled = false;
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._isDestinationLoaded = true;
        if (this._isEventsLoaded && this._isOffersLoaded) {
          this._loadTable();
        }
        break;
      case UpdateType.INIT_OFFERS:
        this._isOffersLoaded = true;
        if (this._isDestinationLoaded && this._isEventsLoaded) {
          this._loadTable();
        }
        break;
      case UpdateType.INIT:
        this._isEventsLoaded = true;
        if (this._isDestinationLoaded && this._isOffersLoaded) {
          this._loadTable();
        }
        break;
    }
  }

  _loadTable() {
    this._isLoading = false;
    remove(this._loadingComponent);
    this._renderTable();
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

    render(this._tableContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(eventList, event) {
    const eventPresenter = new EventPresenter(eventList, this._handleViewAction, this._handleModeChange, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderLoading() {
    render(this._tableContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvents() {
    render(this._tableContainer, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList(events) {
    render(this._tableContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    let mapIndex = 0;
    events.forEach((value, key) => {
      mapIndex++;
      const eventDayComponent = new EventDayView(key, mapIndex);
      this._eventDayComponents.push(eventDayComponent);
      render(this._eventListComponent, eventDayComponent, RenderPosition.BEFOREEND);

      const eventDayListComponent = new EventDayListView();
      this._eventDayListComponents.push(eventDayListComponent);
      render(eventDayComponent, eventDayListComponent, RenderPosition.BEFOREEND);

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

  _clearTable(resetSortType = false) {
    this._clearEventList();

    remove(this._sortComponent);
    remove(this._noEventsComponent);
    remove(this._loadingComponent);
    if (this._newEventPresenter !== null) {
      this._newEventPresenter.destroy();
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTable() {
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
