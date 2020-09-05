import TripInfoContainerView from "./view/trip-info-container.js";
import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import {generateEvent} from "./mock/event.js";
import {render} from "./utils/render.js";

const EVENT_COUNT = 10;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsInOrder = events.slice().sort((a, b) => {
  return a.startDate - b.startDate;
});

const convertDay = (day) => {
  return day.toLocaleString(`en-US`, {year: `numeric`, month: `short`, day: `numeric`}).toUpperCase();
};
const days = eventsInOrder.map((object) => {
  return convertDay(object.startDate);
});
const daysUniq = new Set(days);

const eventsByDays = new Map();
daysUniq.forEach((day) => {
  eventsByDays.set(day, events.filter((event) => {
    return convertDay(event.startDate) === day;
  }));
});

const siteHeaderElement = document.querySelector(`.trip-main`);

const TripInfoContainerComponent = new TripInfoContainerView();
render(siteHeaderElement, TripInfoContainerComponent, `afterbegin`);

if (eventsByDays.size > 0) {
  render(TripInfoContainerComponent, new TripInfoView(eventsInOrder), `afterbegin`);
}

render(TripInfoContainerComponent, new TripCostView(eventsInOrder), `beforeend`);

const menuElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);

render(menuElement, new SiteMenuView(), `afterbegin`);

const menuTitleElement = menuElement.querySelector(`.trip-main__trip-controls h2:first-of-type`);
menuElement.prepend(menuTitleElement);

render(menuElement, new FilterView(), `beforeend`);

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(boardElement);
boardPresenter.init(eventsByDays);
