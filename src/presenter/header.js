import TripInfoContainerView from "./view/trip-info-container.js";
import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import EventEditView from "./view/event-edit.js";
import EventListView from "./view/event-list.js";
import EventDayView from "./view/event-day.js";
import EventDayListView from "./view/event-day-list.js";
import EventView from "./view/event.js";
import NoEventsView from "./view/no-events.js";
import {render} from "../utils/render.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._Component = new ();
    this._Component = new ();
    this._Component = new ();
    this._Component = new ();
    this._Component = new ();
    this._Component = new ();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderTask() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderTasks() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
