import HeaderPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/board.js";
import EventModel from "./model/event.js";
import FilterModel from "./model/filter.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 10;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);

const headerPresenter = new HeaderPresenter(siteHeaderElement, eventsModel, filterModel);
headerPresenter.init();

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(boardElement, eventsModel, filterModel);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
