const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const DESTINATIONS = [`Amsterdam`, `Chamonix`, `Geneva`, `London`, `Prague`, `Oslo`, `Bergen`];
const EVENT_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];
const OFFERS = [
  {
    type: `transport`,
    name: `Order Uber`,
    price: `20`,
  },
  {
    type: `hotel`,
    name: `Add luggage`,
    price: `50`,
  },
  {
    type: `transport`,
    name: `Rent a car`,
    price: `200`,
  },
  {
    type: `food`,
    name: `Add breakfast`,
    price: `50`,
  },
  {
    type: `transport`,
    name: `Book tickets`,
    price: `40`,
  },
  {
    type: `food`,
    name: `Lunch in city`,
    price: `30`,
  },
  {
    type: `hotel`,
    name: `Switch to comfort`,
    price: `80`,
  },
  {
    type: `food`,
    name: `Add meal`,
    price: `15`,
  },
  {
    type: `transport`,
    name: `Travel by train`,
    price: `40`,
  },
  {
    type: `transport`,
    name: `Choose seats`,
    price: `5`,
  },
];

export {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS, OFFERS};
