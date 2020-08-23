import {getShortDate} from "../util.js";

export const createEventDayTemplate = (day, index) => {
  const date = new Date(day);
  const dateShort = getShortDate(date);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="${date.toISOString()}">${dateShort}</time>
    </div>

    <ul class="trip-events__list"></ul>
    </li>`
  );
};
