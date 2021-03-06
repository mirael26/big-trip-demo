import {EVENT_TYPES} from "../const.js";
import moment from "moment";

const getEventsInOrder = (events) => {
  return events.slice().sort((a, b) => {
    return a.startDate - b.startDate;
  });
};

const sortEventsByDays = (events) => {
  const eventsInOrder = getEventsInOrder(events);

  const convertDay = (day) => {
    return day.toLocaleString(`en-US`, {year: `numeric`, month: `short`, day: `numeric`}).toUpperCase();
  };

  const days = eventsInOrder.map((day) => {
    return convertDay(day.startDate);
  });
  const daysUniq = new Set(days);

  const eventsByDays = new Map();
  daysUniq.forEach((day) => {
    eventsByDays.set(day, events
      .filter((event) => {
        return convertDay(event.startDate) === day;
      })
      .sort((a, b) => {
        return a.startDate - b.startDate;
      }));
  });
  return eventsByDays;
};

const getPreposition = (type) => {
  return EVENT_TYPES.activity.includes(type) ? `in` : `to`;
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return new Date(currentDate);
};

const getShortDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `numeric`}).toUpperCase();
};

const formatFullDate = (date) => {
  return moment(date).format(`MM/DD/YY HH:mm`);
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDuration = (startDate, endDate) => {
  const duration = endDate - startDate;
  const days = moment.duration(duration).days();
  const hours = moment.duration(duration).hours();
  const minutes = moment.duration(duration).minutes();

  return `${days ? `${days}D ` : ``}${hours ? `${hours}H ` : ``}${minutes ? `${minutes}M ` : ``}`;
};

const sortEventsByTime = (eventA, eventB) => {
  return (eventB.endDate - eventB.startDate) - (eventA.endDate - eventA.startDate);
};

const sortEventsByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export {getEventsInOrder, getPreposition, getCurrentDate, formatFullDate, formatTime, formatDuration, getShortDate, sortEventsByTime, sortEventsByPrice, sortEventsByDays};
