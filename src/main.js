import HeaderPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/board.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 10;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsInOrder = events.slice().sort((a, b) => {
  return a.startDate - b.startDate;
});

const siteHeaderElement = document.querySelector(`.trip-main`);

const headerPresenter = new HeaderPresenter(siteHeaderElement);
headerPresenter.init(eventsInOrder);

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(boardElement);
tripPresenter.init(eventsInOrder);
