import HeaderPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/board.js";
import EventModel from "./model/event.js";
import FilterModel from "./model/filter.js";
import {UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic sr68h4684aef4`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-body__page-main`);

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter(siteHeaderElement, eventsModel, filterModel);
headerPresenter.init();

const boardElement = siteMainElement.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(boardElement, eventsModel, filterModel, api);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});

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
