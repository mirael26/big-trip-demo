import TripInfoView from "../view/trip-info.js";
import TripControlsView from "../view/trip-controls.js";
import SiteMenuView from "../view/site-menu.js";
import FilterView from "../view/filter.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class Header {
  constructor(headerContainer, eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._headerContainer = headerContainer;

    this._isLoading = true;

    this._tripInfoComponent = null;
    this._tripControlsComponent = new TripControlsView();
    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = null;
    this._headerHandleModelChange = this._headerHandleModelChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._headerHandleModelChange);
    this._filterModel.addObserver(this._headerHandleModelChange);
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
        this._clearFilter();
        this._renderFilter();
        break;
      case UpdateType.MAJOR:
        this._clearFilter();
        this._renderFilter();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._renderHeader();
        break;
    }
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _renderTripInfo() {
    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfoView(this._getEvents());
    render(this._headerContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTripInfo() {
    remove(this._tripInfoComponent);
  }

  _renderSiteMenu() {
    render(this._tripControlsComponent, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    if (this._filterComponent !== null) {
      remove(this._filterComponent);
    }
    this._filterComponent = new FilterView(this._filterModel.getFilter(), this._eventsModel);
    render(this._tripControlsComponent, this._filterComponent, RenderPosition.BEFOREEND);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _clearFilter() {
    remove(this._filterComponent);
  }

  _renderTripControls() {
    render(this._headerContainer, this._tripControlsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderHeader() {
    this._renderTripControls();

    if (this._isLoading) {
      return;
    }

    this._renderFilter();
    this._renderTripInfo();
  }
}
