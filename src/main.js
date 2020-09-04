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
import NoEventsView from "./view/no-events.js";
import {generateEvent} from "./mock/event.js";
import {render} from "./util.js";

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

const renderEvent = (eventList, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventList, eventComponent.getElement(), `beforeend`);
};

const renderBoard = (boardEvents) => {
  const boardElement = siteMainElement.querySelector(`.trip-events`);

  if (boardEvents.size === 0) {
    render(boardElement, new NoEventsView().getElement(), `afterbegin`);
    return;
  }

  render(boardElement, new SortView(events).getElement(), `afterbegin`);

  const eventListComponent = new EventListView();
  render(boardElement, eventListComponent.getElement(), `beforeend`);

  let mapIndex = 0;
  eventsByDays.forEach((value, key) => {
    mapIndex++;
    const eventDayComponent = new EventDayView(key, mapIndex);
    render(eventListComponent.getElement(), eventDayComponent.getElement(), `beforeend`);

    const eventDayListComponent = new EventDayListView();
    render(eventDayComponent.getElement(), eventDayListComponent.getElement(), `beforeend`);

    value.forEach((event) => {
      renderEvent(eventDayListComponent.getElement(), event);
    });
  });
};

const siteHeaderElement = document.querySelector(`.trip-main`);

const TripInfoContainerComponent = new TripInfoContainerView();
render(siteHeaderElement, TripInfoContainerComponent.getElement(), `afterbegin`);

if (eventsByDays.length > 0) {
  render(TripInfoContainerComponent.getElement(), new TripInfoView(eventsInOrder).getElement(), `afterbegin`);
}

render(TripInfoContainerComponent.getElement(), new TripCostView(eventsInOrder).getElement(), `beforeend`);

const menuElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);

render(menuElement, new SiteMenuView().getElement(), `afterbegin`);

const menuTitleElement = menuElement.querySelector(`.trip-main__trip-controls h2:first-of-type`);
menuElement.prepend(menuTitleElement);

render(menuElement, new FilterView().getElement(), `beforeend`);

const siteMainElement = document.querySelector(`.page-body__page-main`);

renderBoard(eventsByDays);

