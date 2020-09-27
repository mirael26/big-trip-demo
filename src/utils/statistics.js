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

const iconsWithLabel = new Map([
  [`taxi`, `🚕 RIDE`],
  [`bus`, `🚌 TRAVEL`],
  [`train`, `🚂 RUSH`],
  [`ship`, `🛳️ SAIL`],
  [`transport`, `🚆 GO`],
  [`drive`, `🚗 DRIVE`],
  [`flight`, `✈️ FLY`],
  [`check-in`, `🏨 STAY`],
  [`sightseeing`, `🏛️ LOOK`],
  [`restaurant`, `🍴 EAT`]
]);

const countMoneyByTypes = (events) => {
  const allEventTypes = EVENT_TYPES.transfer.concat(EVENT_TYPES.activity);

  const eventsWithPrice = allEventTypes.map((type) => {
    const newObject = [];
    newObject.type = iconsWithLabel.get(type);
    newObject.price = events
      .filter((event) => {
        return event.type === type;
      })
      .reduce((accumulator, event) => accumulator + event.price, 0);
    return newObject;
  })
    .filter((element) => element.price !== 0);
  const moneyStatistics = [];
  moneyStatistics.types = eventsWithPrice.map((event) => event.type);
  moneyStatistics.price = eventsWithPrice.map((event) => event.price);

  return moneyStatistics;
};

const countTransportTrip = (events) => {
  const transportWithTripCount = EVENT_TYPES.transfer.map((type) => {
    const newObject = [];
    newObject.type = iconsWithLabel.get(type);
    newObject.tripCount = events
      .filter((event) => {
        return event.type === type;
      }).length;
    return newObject;
  })
    .filter((transport) => transport.tripCount !== 0);
  const tranportTripStatistics = [];
  tranportTripStatistics.types = transportWithTripCount.map((element) => element.type);
  tranportTripStatistics.tripCounts = transportWithTripCount.map((element) => element.tripCount);
  return tranportTripStatistics;
};

const countTimeSpend = (events) => {
  const getDurationInHours = (startDate, endDate) => {
    const duration = endDate - startDate;
    const days = moment.duration(duration).days();
    let hours = moment.duration(duration).hours();
    if (!days === 0) {
      hours = days * 24 + hours;
    }
    return hours;
  };

  const timeSpendStatistics = [];
  timeSpendStatistics.points = events.map((event) => {
    return `${icons.get(event.type)} ${getPreposition(event.type).toUpperCase()} ${event.destination.toUpperCase()}`;
  });
  timeSpendStatistics.time = events.map((event) => getDurationInHours(event.startDate, event.endDate));
  return timeSpendStatistics;
};

export {countMoneyByTypes, countTransportTrip, countTimeSpend};
