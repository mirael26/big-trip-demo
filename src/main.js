import {createTripInfoContainerTemplate} from "./view/trip-info-container.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventDayTemplate} from "./view/event-day.js";
import {createEventTemplate} from "./view/event.js";

const render = (containter, template, place) => {
  containter.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.trip-main`);

render(siteHeaderElement, createTripInfoContainerTemplate(), `afterbegin`);

const tripInfoElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(tripInfoElement, createTripCostTemplate(), `beforeend`);

const menuElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const menuTitleElement = menuElement.querySelector(`.trip-main__trip-controls h2:first-of-type`);

render(menuTitleElement, createSiteMenuTemplate(), `afterend`);
render(menuElement, createFilterTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

render(boardElement, createSortTemplate(), `beforeend`);
render(boardElement, createEventEditTemplate(), `beforeend`);
render(boardElement, createEventListTemplate(), `beforeend`);

const eventListElement = boardElement.querySelector(`.trip-days`);

render(eventListElement, createEventDayTemplate(), `beforeend`);

const dayListElement = eventListElement.querySelector(`.trip-events__list`);

render(dayListElement, createEventTemplate(), `beforeend`);
render(dayListElement, createEventTemplate(), `beforeend`);
render(dayListElement, createEventTemplate(), `beforeend`);
