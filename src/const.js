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
        price: 120
      }, {
        title: `Choose the radio station`,
        price: 60
      }, {
        title: `Order Uber`,
        price: 20
      }
    ]
  }, {
    type: `bus`,
    offers: [
      {
        title: `Choose seats with TV`,
        price: 20
      }, {
        title: `Order a guide`,
        price: 100
      }
    ]
  }, {
    type: `train`,
    offers: [
      {
        title: `Choose comfort seats`,
        price: 50
      }, {
        title: `Add meal`,
        price: 20
      }
    ]
  }, {
    type: `ship`,
    offers: [
      {
        title: `Book cabin with hatch`,
        price: 70
      }, {
        title: `Add meal`,
        price: 20
      }
    ]
  }, {
    type: `transport`,
    offers: [
      {
        title: `Add luggage`,
        price: 30
      }, {
        title: `Add meal`,
        price: 20
      }
    ]
  }, {
    type: `drive`,
    offers: [
      {
        title: `Rent a car`,
        price: 200
      }, {
        title: `Car washing`,
        price: 30
      }
    ]
  }, {
    type: `flight`,
    offers: [
      {
        title: `Add luggage`,
        price: 30
      }, {
        title: `Switch to comfort class`,
        price: 100
      }, {
        title: `Add meal`,
        price: 15
      }, {
        title: `Choose seats`,
        price: 5
      }
    ]
  }, {
    type: `check-in`,
    offers: [
      {
        title: `Add breakfast`,
        price: 50
      }, {
        title: `Add parking slot`,
        price: 10
      }
    ]
  }, {
    type: `sightseeing`,
    offers: [
      {
        title: `Book tickets`,
        price: 40
      }, {
        title: `Lunch in city`,
        price: 30
      }
    ]
  }, {
    type: `restaurant`,
    offers: [
      {
        title: `Reserve a table`,
        price: 5
      }, {
        title: `Order live music`,
        price: 100
      }
    ]
  },
];

const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

export {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS, OFFERS, SortType};
