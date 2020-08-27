import TripInfoContainerView from "./view/trip-info-container.js";
import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import EventEditView from "./view/event-edit.js";
import EventListView from "./view/event-list.js";
import EventDayView from "./view/event-day.js";
import EventDayListView from "./view/event-day-list.js";
import EventView from "./view/event.js";
import {generateEvent} from "./mock/event.js";
import {renderTemplate, render, createElement} from "./util.js";

const EVENT_COUNT = 8;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const eventsInOrder = events.slice(1).sort((a, b) => {
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
render(siteHeaderElement, TripInfoContainerComponent.getElement(), `afterbegin`);

render(TripInfoContainerComponent.getElement(), new TripInfoView(eventsInOrder).getElement(), `afterbegin`);
render(TripInfoContainerComponent.getElement(), new TripCostView(eventsInOrder).getElement(), `beforeend`);

const menuElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);

render(menuElement, new SiteMenuView().getElement(), `afterbegin`);

const menuTitleElement = menuElement.querySelector(`.trip-main__trip-controls h2:first-of-type`);
menuElement.prepend(menuTitleElement);

render(menuElement, new FilterView().getElement(), `beforeend`);

const siteMainElement = document.querySelector(`.page-body__page-main`);
const boardElement = siteMainElement.querySelector(`.trip-events`);

render(boardElement, new SortView(events).getElement(), `afterbegin`);
render(boardElement, new EventEditView(events[0]).getElement(), `beforeend`);

const eventListComponent = new EventListView();
render(boardElement, eventListComponent.getElement(), `beforeend`);

if (events.length !== 0) {
  let mapIndex = 0;
  eventsByDays.forEach((value, key) => {
    mapIndex++;
    const eventDayComponent = new EventDayView(key, mapIndex);
    render(eventListComponent.getElement(), eventDayComponent.getElement(), `beforeend`);

    const eventDayListComponent = new EventDayListView();
    render(eventDayComponent.getElement(), eventDayListComponent.getElement(), `beforeend`);

    value.forEach((event) => {
      render(eventDayListComponent.getElement(), new EventView(event).getElement(), `beforeend`);
    });
  });
}
