import HeaderPresenter from "./presenter/header.js";
import TablePresenter from "./presenter/table.js";
import EventModel from "./model/event.js";
import FilterModel from "./model/filter.js";
import SiteMenuView from "./view/site-menu.js";
import AddNewEventButton from "./view/add-new-event-button.js";
import StaticsticsView from "./view/statistics.js";
import {UpdateType} from "./const.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import Api from "./api.js";
import {MenuItem} from "./const.js";

const AUTHORIZATION = `Basic sr68h4684aef40`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-body__page-main`);

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventModel();
const filterModel = new FilterModel();
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      remove(statisticsComponent);
      tablePresenter.destroy();
      tablePresenter.init();
      tablePresenter.createEvent();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.TABLE:
      tablePresenter.destroy();
      tablePresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      addNewEventButtonComponent.getElement().disabled = false;
      break;
    case MenuItem.STATISTICS:
      tablePresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StaticsticsView(eventsModel.getEvents());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      addNewEventButtonComponent.getElement().disabled = false;
      break;
  }
};

const headerPresenter = new HeaderPresenter(siteHeaderElement, eventsModel, filterModel);
headerPresenter.init();
const tripControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);

const siteMenuComponent = new SiteMenuView();
render(tripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
const addNewEventButtonComponent = new AddNewEventButton();
render(siteHeaderElement, addNewEventButtonComponent, RenderPosition.BEFOREEND);
addNewEventButtonComponent.setMenuClickHandler(handleSiteMenuClick);


const tableElement = siteMainElement.querySelector(`.trip-events`);
const tablePresenter = new TablePresenter(tableElement, eventsModel, filterModel, api, addNewEventButtonComponent.getElement());
tablePresenter.init();

api.getDestinations()
  .then((destinations) => {
    eventsModel.setDestinations(UpdateType.INIT_DESTINATIONS, destinations);
  })
  .catch(() => {
    eventsModel.setDestinations(UpdateType.INIT_DESTINATIONS, []);
  });

api.getOffers()
  .then((offers) => {
    eventsModel.setOffers(UpdateType.INIT_OFFERS, offers);
  })
  .catch(() => {
    eventsModel.setOffers(UpdateType.INIT_OFFERS, []);
  });

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });
