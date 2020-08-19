export const createEventTemplate = (event) => {
  const {type, destination, startDate, endDate} = event;
  const preposition = (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) ? `in` : `to`;

  const completeNubmer = (number) => {
    return (`0` + number.toString()).slice(-2);
  };

  const startTimeHours = completeNubmer(startDate.getHours());
  const startTimeMinutes = completeNubmer(startDate.getMinutes());
  const endTimeHours = completeNubmer(endDate.getHours());
  const endTimeMinutes = completeNubmer(endDate.getMinutes());
  const duration = (endDate - startDate);

  const convertDuration = (millisec) => {
    let minutes = (millisec / (1000 * 60)).toFixed(0);
    let hours = completeNubmer(Math.floor(minutes / 60));
    let days = ``;
    if (hours >= 24) {
      days = completeNubmer(Math.floor(hours / 24));
      hours = hours - (days * 24);
    }

    minutes = completeNubmer(Math.floor(minutes % 60));
    if (days !== ``) {
      return days + `D ` + hours + `H ` + minutes + `M`;
    } else if (hours > 0) {
      return hours + `H ` + minutes + `M`;
    }
    return minutes + `M`;
  };


  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${preposition} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDate.toISOString()}">${startTimeHours}:${startTimeMinutes}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate.toISOString()}">${endTimeHours}:${endTimeMinutes}</time>
        </p>
        <p class="event__duration">${convertDuration(duration)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">20</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">20</span>
         </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`
  );
};
