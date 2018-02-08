import Highcharts from 'highcharts/highstock';

export default class StockChart {
  constructor(divClass, series, config) {
    
    this.divClass = divClass;
    this.series = series;
    this.config = config;
    this.chart = null;
    this.create()
  }

  create() {
    const theConfig = {

      rangeSelector: {
        selected: 4
      },

      yAxis: {
        labels: {
          formatter: function () {
              return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },

      series: this.series
    }

    this.chart = Highcharts.stockChart(this.divClass, theConfig)
  }

  add(serie) {
    try {
      this.chart.addSeries(serie);
    } catch(e) {
      console.log(e)
    }
  }

  update(series) {
    this.series = series;
    this.chart.destroy();
    this.create();
  }
}
