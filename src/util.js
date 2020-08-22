const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const isBoardEmpty = () => {
  const eventContainer = document.querySelector(`.trip-days`);
  console.log(eventContainer.innerHTML);
  return eventContainer.innerHTML === ``;
};

const getPreposition = (type) => {
  return (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) ? `in` : `to`;
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return new Date(currentDate);
};

const completeDateNubmer = (number) => {
  return (`0` + number.toString()).slice(-2);
};

export {getRandomInteger, getRandomElement, isBoardEmpty, getPreposition, getCurrentDate, completeDateNubmer};
