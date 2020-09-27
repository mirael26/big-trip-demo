import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SmartView from "./smart.js";
import {countMoneyByTypes, countTransportTrip, countTimeSpend} from "../utils/statistics.js";

const BAR_HEIGHT = 30;

export default class Statistics extends SmartView {
  constructor(events) {
    super();

    this._event = events;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._moneyStatistics = countMoneyByTypes(this._event);
    this._transportStatistics = countTransportTrip(this._event);
    this._timeSpendStatistics = countTimeSpend(this._event);

    this._setCharts();
  }

  _renderChart(ctx, text, formatter, statisticsForLabels, statisticsForData) {
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: statisticsForLabels,
        datasets: [{
          data: statisticsForData,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter
          }
        },
        title: {
          display: true,
          text,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _getTemplate() {
    return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }

  restoreHandlers() {
    this._setCharts();
    this._setDatepicker();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * this._moneyStatistics.price.length;
    transportCtx.height = BAR_HEIGHT * this._transportStatistics.tripCounts.length;
    timeSpendCtx.height = BAR_HEIGHT * this._event.length;

    const moneyFormatter = (val) => `€ ${val}`;
    const transportFormatter = (val) => `${val}x`;
    const timeSpendFormatter = (val) => val < 1 ? `<1H` : `${val}H`;

    this._moneyChart = this._renderChart(moneyCtx, `MONEY`, moneyFormatter, this._moneyStatistics.types, this._moneyStatistics.price);
    this._transportChart = this._renderChart(transportCtx, `TRANSPORT`, transportFormatter, this._transportStatistics.types, this._transportStatistics.tripCounts);
    this._timeSpendChart = this._renderChart(timeSpendCtx, `TIME SPEND`, timeSpendFormatter, this._timeSpendStatistics.points, this._timeSpendStatistics.time);
  }
}
