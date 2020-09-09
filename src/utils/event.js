import {EVENT_TYPES} from "../const.js";

const sortEventsByDays = (events) => {
  const convertDay = (day) => {
    return day.toLocaleString(`en-US`, {year: `numeric`, month: `short`, day: `numeric`}).toUpperCase();
  };

  const days = events.map((object) => {
    return convertDay(object.startDate);
  });
  const daysUniq = new Set(days);

  const eventsByDays = new Map();
  daysUniq.forEach((day) => {
    eventsByDays.set(day, events.filter((event) => {
      return convertDay(event.startDate) === day;
    }));
  });
  return eventsByDays;
};

const isNoEvents = (events) => {
  return events.length === 0;
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

const completeDateNubmer = (number) => {
  return (`0` + number.toString()).slice(-2);
};

const sortEventsByTime = (eventA, eventB) => {
  return (eventB.endDate - eventB.startDate) - (eventA.endDate - eventA.startDate);
};

const sortEventsByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export {isNoEvents, getPreposition, getCurrentDate, completeDateNubmer, getShortDate, sortEventsByTime, sortEventsByPrice, sortEventsByDays};
