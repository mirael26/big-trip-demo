import {createTripInfoContainerTemplate} from "./view/trip-info-container.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventFormTemplate} from "./view/event-form.js";
import {createEventListTemplate} from "./view/event-list.js";
import {createEventDayTemplate} from "./view/event-day.js";
import {createEventTemplate} from "./view/event.js";
import {generateEvent} from "./mock/event.js";
// import {isNoEvents} from "./util.js";

const EVENT_COUNT = 8;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsInOrder = events.slice(1).sort((a, b) => {
  return a.startDate - b.startDate;
});
console.log(eventsInOrder);

const convertDay = (day) => {
  return day.toLocaleString(`en-US`, {year: `numeric`, month: `short`, day: `numeric`}).toUpperCase();
};
const days = eventsInOrder.map((object) => {
  return convertDay(object.startDate);
});
const daysUniq = Array.from(new Set(days));

const eventsByDays = new Map();
daysUniq.forEach((day) => {
  eventsByDays.set(day, events.filter((event) => {
    return convertDay(event.startDate) === day;
  }));
});

const render = (containter, template, place) => {
  containter.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.trip-main`);

render(siteHeaderElement, createTripInfoContainerTemplate(), `afterbegin`);

const tripInfoElement = siteHeaderElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createTripInfoTemplate(eventsInOrder), `afterbegin`);
render(tripInfoElement, createTripCostTemplate(), `beforeend`);

const menuElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const menuTitleElement = menuElement.querySelector(`.trip-main__trip-controls h2:first-of-type`);

render(menuTitleElement, createSiteMenuTemplate(), `afterend`);
render(menuElement, createFilterTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

render(boardElement, createSortTemplate(events), `afterbegin`);
render(boardElement, createEventFormTemplate(events[0]), `beforeend`);
render(boardElement, createEventListTemplate(), `beforeend`);

const eventListElement = boardElement.querySelector(`.trip-days`);

if (events.length !== 0) {
  let mapIndex = 0;
  eventsByDays.forEach((value, key) => {
    mapIndex++;
    render(eventListElement, createEventDayTemplate(key, mapIndex), `beforeend`);

    const dayListElements = eventListElement.querySelectorAll(`.trip-events__list`);
    const currentDayListElement = dayListElements[dayListElements.length - 1];

    value.forEach((event) => {
      render(currentDayListElement, createEventTemplate(event), `beforeend`);
    });
  });
}
