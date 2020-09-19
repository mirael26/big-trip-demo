const EVENT_TYPES = {
  transfer: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activity: [`check-in`, `sightseeing`, `restaurant`]
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
    type: `taxi`,
    offers: [
      {
        title: `Upgrade to a business class`,
        short: `business`,
        price: 120
      }, {
        title: `Choose the radio station`,
        short: `radio`,
        price: 60
      }, {
        title: `Order Uber`,
        short: `uber`,
        price: 20
      }
    ]
  }, {
    type: `bus`,
    offers: [
      {
        title: `Choose seats with TV`,
        short: `tv`,
        price: 20
      }, {
        title: `Order a guide`,
        short: `guide`,
        price: 100
      }, {
        title: `Add luggage`,
        short: `luggage`,
        price: 20
      }
    ]
  }, {
    type: `train`,
    offers: [
      {
        title: `Choose comfort seats`,
        short: `comfort`,
        price: 50
      }, {
        title: `Add meal`,
        short: `meal`,
        price: 20
      }, {
        title: `Add luggage`,
        short: `luggage`,
        price: 20
      }
    ]
  }, {
    type: `ship`,
    offers: [
      {
        title: `Book cabin with window`,
        short: `window`,
        price: 70
      }, {
        title: `Add meal`,
        short: `meal`,
        price: 20
      }, {
        title: `Add luggage`,
        short: `luggage`,
        price: 20
      }
    ]
  }, {
    type: `transport`,
    offers: [
      {
        title: `Add luggage`,
        short: `luggage`,
        price: 30
      }, {
        title: `Add meal`,
        short: `meal`,
        price: 20
      }, {
        title: `Choose comfort seats`,
        short: `comfort`,
        price: 50
      }
    ]
  }, {
    type: `drive`,
    offers: [
      {
        title: `Rent a car`,
        short: `rent`,
        price: 200
      }, {
        title: `Car washing`,
        short: `washing`,
        price: 30
      }, {
        title: `Add luggage`,
        short: `luggage`,
        price: 20
      }
    ]
  }, {
    type: `flight`,
    offers: [
      {
        title: `Add luggage`,
        short: `luggage`,
        price: 30
      }, {
        title: `Switch to comfort class`,
        short: `comfort`,
        price: 100
      }, {
        title: `Add meal`,
        short: `meal`,
        price: 15
      }, {
        title: `Choose seats`,
        short: `seats`,
        price: 5
      }
    ]
  }, {
    type: `check-in`,
    offers: [
      {
        title: `Add breakfast`,
        short: `breakfast`,
        price: 50
      }, {
        title: `Add parking slot`,
        short: `parking`,
        price: 10
      }, {
        title: `Add more bed`,
        short: `bed`,
        price: 30
      }
    ]
  }, {
    type: `sightseeing`,
    offers: [
      {
        title: `Book tickets`,
        short: `tickets`,
        price: 40
      }, {
        title: `Lunch in city`,
        short: `lunch`,
        price: 30
      }, {
        title: `Order a guide`,
        short: `guide`,
        price: 80
      }
    ]
  }, {
    type: `restaurant`,
    offers: [
      {
        title: `Reserve a table`,
        short: `reserve`,
        price: 5
      }, {
        title: `Order live music`,
        short: `music`,
        price: 100
      }, {
        title: `Order taxi`,
        short: `taxi`,
        price: 30
      }
    ]
  },
];

const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS, OFFERS, SortType, UserAction, UpdateType, FilterType};
