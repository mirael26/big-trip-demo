import {FilterType} from "../const";
import {getCurrentDate} from "./event.js";

const filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((event) => event.startDate > getCurrentDate()),
  [FilterType.PAST]: (events) => events.filter((event) => event.endDate < getCurrentDate())
};

export {filter};
