import HeaderPresenter from "./presenter/header.js";
import TablePresenter from "./presenter/table.js";
import EventModel from "./model/event.js";
import FilterModel from "./model/filter.js";
import SiteMenuView from "./view/site-menu.js";
import AddNewEventButton from "./view/add-new-event-button.js";
import StaticsticsView from "./view/statistics.js";
import {UpdateType} from "./const.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {MenuItem} from "./const.js";

const AUTHORIZATION = `Basic sr68h4684aef41`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_NAME_DESTINATIONS = `${STORE_NAME}-destinations`;
const STORE_NAME_OFFERS = `${STORE_NAME}-offers`;

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-body__page-main`);

const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const destinationsStore = new Store(STORE_NAME_DESTINATIONS, window.localStorage);
const offersStore = new Store(STORE_NAME_OFFERS, window.localStorage);
const apiWithProvider = new Provider(api, store, destinationsStore, offersStore);

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
const tablePresenter = new TablePresenter(tableElement, eventsModel, filterModel, apiWithProvider, addNewEventButtonComponent.getElement());
tablePresenter.init();

apiWithProvider.getDestinations()
  .then((destinations) => {
    eventsModel.setDestinations(UpdateType.INIT_DESTINATIONS, destinations);
  })
  .catch(() => {
    eventsModel.setDestinations(UpdateType.INIT_DESTINATIONS, []);
  });

apiWithProvider.getOffers()
  .then((offers) => {
    eventsModel.setOffers(UpdateType.INIT_OFFERS, offers);
  })
  .catch(() => {
    eventsModel.setOffers(UpdateType.INIT_OFFERS, []);
  });

apiWithProvider.getEvents()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
      .then(() => {})
      .catch(() => {
        throw new Error(`ServiceWorker isn't available`);
      });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
