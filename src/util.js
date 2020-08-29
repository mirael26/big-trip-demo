import {EVENT_TYPES} from "./const.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderTemplate = (containter, template, place) => {
  containter.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
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

export {RenderPosition, render, createElement, renderTemplate, getRandomInteger, getRandomElement, isNoEvents, getPreposition, getCurrentDate, completeDateNubmer, getShortDate};
