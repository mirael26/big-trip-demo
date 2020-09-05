import {EVENT_TYPES} from "../const.js";

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

export {isNoEvents, getPreposition, getCurrentDate, completeDateNubmer, getShortDate};
