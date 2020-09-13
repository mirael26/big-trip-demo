import {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS, OFFERS} from "../const.js";
import {getRandomInteger, getRandomElement} from "../utils/common.js";

const DESCRIPTION_COUNT_MIN = 0;
const DESCRIPTION_COUNT_MAX = 5;
const PHOTO_COUNT_MIN = 2;
const PHOTO_COUNT_MAX = 5;
const DAYS_MIN = 1;
const DAYS_MAX = 5;
const TIME_HOURS_MIN = 9;
const TIME_HOURS_MAX = 20;
const TIME_MINUTES_STEP = 5;
const PRICE_MIN = 200;
const PRICE_MAX = 600;
const OPTIONS_MIN = 0;
const OPTIONS_MAX = 4;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDate = () => {
  const daysGap = getRandomInteger(DAYS_MIN, DAYS_MAX);
  const daysCount = 2;

  const days = new Array(daysCount).fill().map(() => {
    const newDate = new Date();
    const hour = getRandomInteger(TIME_HOURS_MIN, TIME_HOURS_MAX);
    const minute = Math.floor(getRandomInteger(0, 60) / TIME_MINUTES_STEP) * TIME_MINUTES_STEP;
    newDate.setHours(hour, minute);
    newDate.setDate(newDate.getDate() + daysGap);

    return new Date(newDate);
  });

  days.sort((a, b) => {
    return a - b;
  });
  return days;
};

export const generateEvent = () => {
  const descriptionCount = getRandomInteger(DESCRIPTION_COUNT_MIN, DESCRIPTION_COUNT_MAX);
  const description = new Array(descriptionCount).fill().map(() => {
    return getRandomElement(EVENT_DESCRIPTIONS);
  }).join(` `);

  const photoCount = getRandomInteger(PHOTO_COUNT_MIN, PHOTO_COUNT_MAX);
  const photo = new Array(photoCount).fill().map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });

  const days = generateDate();
  const price = Math.round(getRandomInteger(PRICE_MIN, PRICE_MAX) / 10) * 10;

  const offersCount = getRandomInteger(OPTIONS_MIN, OPTIONS_MAX);
  const offers = new Array(offersCount).fill().map(() => {
    return getRandomElement(OFFERS);
  });

  const allEventTypes = EVENT_TYPES.transfer.concat(EVENT_TYPES.activity);

  return {
    id: generateId(),
    type: getRandomElement(allEventTypes),
    destination: getRandomElement(DESTINATIONS),
    destinationInfo: {
      description,
      photo,
    },
    startDate: days[0],
    endDate: days[1],
    price,
    offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
