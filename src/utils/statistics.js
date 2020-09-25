import {EVENT_TYPES} from "../const.js";
import {getPreposition} from "../utils/event.js";
import moment from "moment";

const icons = new Map([
  [`taxi`, `🚕`],
  [`bus`, `🚌`],
  [`train`, `🚂`],
  [`ship`, `🛳️`],
  [`transport`, `🚆`],
  [`drive`, `🚗`],
  [`flight`, `✈️`],
  [`check-in`, `🏨`],
  [`sightseeing`, `🏛️`],
  [`restaurant`, `🍴`]
]);

const countMoneyByTypes = (events) => {
  const allEventTypes = EVENT_TYPES.transfer.concat(EVENT_TYPES.activity);

  const moneyStatistics = allEventTypes.map((type) => {
    return events
      .filter((event) => {
        return event.type === type;
      })
      .reduce((accumulator, event) => accumulator + event.price, 0);
  });
  return moneyStatistics;
};

const countTransportTrip = (events) => {
  const tranportTripStatistics = EVENT_TYPES.transfer.map((type) => {
    return events.filter((event) => {
      return event.type === type;
    }).length;
  });
  return tranportTripStatistics;
};

const countEventsPoints = (events) => {
  const eventsPointsStatistics = events.map((event) => {
    return `${icons.get(event.type)} ${getPreposition(event.type).toUpperCase()} ${event.destination.toUpperCase()}`;
  });
  return eventsPointsStatistics;
};

const countEventsTime = (events) => {
  const getDurationInHours = (startDate, endDate) => {
    const duration = endDate - startDate;
    const d = moment.duration(duration).days();
    let h = moment.duration(duration).hours();
    if (!d === 0) {
      h = d * 24 + h;
    }

    return h >= 1 ? `${Math.round(h)}H` : `<1H`;
  };
  const eventsTimeStatistics = events.map((event) => getDurationInHours(event.startDate, event.endDate));
  return eventsTimeStatistics;
};

export {countMoneyByTypes, countTransportTrip, countEventsPoints, countEventsTime};
