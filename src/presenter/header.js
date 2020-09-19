import TripInfoView from "../view/trip-info.js";
import TripControlsView from "../view/trip-controls.js";
import SiteMenuView from "../view/site-menu.js";
import FilterView from "../view/filter.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class Header {
  constructor(headerContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._headerContainer = headerContainer;

    this._tripInfoComponent = null;
    this._tripControlsComponent = new TripControlsView();
    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._headerHandleModelChange = this._headerHandleModelChange.bind(this);

    this._eventsModel.addObserver(this._headerHandleModelChange);
  }

  init() {
    this._renderHeader();
  }

  _getEvents() {
    return this._eventsModel.getEvents();
  }

  _headerHandleModelChange(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._clearTripInfo();
        this._renderTripInfo();
        break;
      case UpdateType.MINOR:
        this._clearTripInfo();
        this._renderTripInfo();
        break;
      case UpdateType.MAJOR:
        break;
    }
  }

  _renderTripInfo() {
    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfoView(this._getEvents());
    render(this._headerContainer, this._tripInfoComponent, `afterbegin`);
  }

  _clearTripInfo() {
    remove(this._tripInfoComponent);
  }

  _renderSiteMenu() {
    render(this._tripControlsComponent, this._siteMenuComponent, `beforeend`);
  }

  _renderFilter() {
    render(this._tripControlsComponent, this._filterComponent, `beforeend`);
  }

  _renderTripControls() {
    render(this._headerContainer, this._tripControlsComponent, `afterbegin`);
    this._renderSiteMenu();
    this._renderFilter();
  }

  _renderHeader() {
    this._renderTripControls();
    this._renderTripInfo();
  }
}
