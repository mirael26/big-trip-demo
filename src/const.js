const EVENT_TYPES = {
  transfer: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  activity: [`Check-in`, `Sightseeing`, `Restaurant`]
};
const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
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
    name: `uber`,
    text: `Order Uber`,
    price: 20,
  },
  {
    type: `hotel`,
    name: `luggage`,
    text: `Add luggage`,
    price: 50,
  },
  {
    type: `transport`,
    name: `car`,
    text: `Rent a car`,
    price: 200,
  },
  {
    type: `food`,
    name: `breakfast`,
    text: `Add breakfast`,
    price: 50,
  },
  {
    type: `transport`,
    name: `tickets`,
    text: `Book tickets`,
    price: 40,
  },
  {
    type: `food`,
    name: `lunch`,
    text: `Lunch in city`,
    price: 30,
  },
  {
    type: `hotel`,
    name: `comfort`,
    text: `Switch to comfort`,
    price: 80,
  },
  {
    type: `food`,
    name: `meal`,
    text: `Add meal`,
    price: 15,
  },
  {
    type: `transport`,
    name: `train`,
    text: `Travel by train`,
    price: 40,
  },
  {
    type: `transport`,
    name: `seats`,
    text: `Choose seats`,
    price: 5,
  },
];

const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS, OFFERS, SortType};
