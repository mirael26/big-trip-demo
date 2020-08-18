import {EVENT_TYPES, DESTINATIONS, EVENT_DESCRIPTIONS} from "../const.js";
import {getRandomInteger, getRandomElement} from "../util.js";

const DESCRIPTION_COUNT_MIN = 0;
const DESCRIPTION_COUNT_MAX = 5;
const PHOTO_COUNT_MIN = 2;
const PHOTO_COUNT_MAX = 5;
const DAYS_MIN = 1;
const DAYS_MAX = 5;
const TIME_HOURS_MIN = 9;
const TIME_HOURS_MAX = 20;
const TIME_MINUTES_STEP = 5;

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

  return {
    type: getRandomElement(EVENT_TYPES),
    destination: getRandomElement(DESTINATIONS),
    destinationInfo: {
      description,
      photo,
    },
    startDate: days[0],
    endDate: days[1]
  };
};
