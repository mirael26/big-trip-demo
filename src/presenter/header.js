import TripInfoContainerView from "../view/trip-info-container.js";
import TripInfoView from "../view/trip-info.js";
import TripCostView from "../view/trip-cost.js";
import TripControlsView from "../view/trip-controls.js";
import SiteMenuView from "../view/site-menu.js";
import FilterView from "../view/filter.js";
import {render} from "../utils/render.js";

export default class Header {
  constructor(headerContainer) {
    this._headerContainer = headerContainer;

    this._tripInfoContainerComponent = new TripInfoContainerView();
    this._tripControlsComponent = new TripControlsView();
    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
  }

  init(eventsInfo) {
    this._eventsInfo = eventsInfo;

    this._renderHeader();
  }

  _renderTripInfo() {
    render(this._tripInfoContainerComponent, new TripInfoView(this._eventsInfo), `afterbegin`);
  }

  _renderTripCost() {
    render(this._tripInfoContainerComponent, new TripCostView(this._eventsInfo), `beforeend`);
  }

  _renderTripInfoContainer() {
    render(this._headerContainer, this._tripInfoContainerComponent, `afterbegin`);
    if (this._eventsInfo.length > 0) {
      this._renderTripInfo();
    }
    this._renderTripCost();
  }

  _renderSiteMenu() {
    render(this._tripControlsComponent, this._siteMenuComponent, `beforeend`);
  }

  _renderFilter() {
    render(this._tripControlsComponent, this._filterComponent, `beforeend`);
  }

  _rednerTripControls() {
    render(this._headerContainer, this._tripControlsComponent, `afterbegin`);
    this._renderSiteMenu();
    this._renderFilter();
  }

  _renderHeader() {
    render(this._headerContainer, this._tripInfoContainerComponent, `afterbegin`);

    this._rednerTripControls();
    this._renderTripInfoContainer();
  }
}
