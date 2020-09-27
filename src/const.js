const EVENT_TYPES = {
  transfer: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activity: [`check-in`, `sightseeing`, `restaurant`]
};

const SortType = {
  DEFAULT: `default`,
  TIME: `time`,
  PRICE: `price`
};

const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  UPDATE_WITHOUT_RELOAD: `UPDATE_WITHOUT_RELOAD`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  PATCH_ONLY_THIS: `PATCH_WITHOUT_RELOAD`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
  INIT_DESTINATIONS: `INIT_DESTINATIONS`,
  INIT_OFFERS: `INIT_OFFERS`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const MenuItem = {
  ADD_NEW_EVENT: `ADD_NEW_EVENT`,
  TABLE: `TABLE`,
  STATISTICS: `STATISTICS`
};

export {EVENT_TYPES, SortType, UserAction, UpdateType, FilterType, MenuItem};
