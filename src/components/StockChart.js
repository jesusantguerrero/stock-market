import Highcharts from 'highcharts';

export default class StockChart {
  constructor(divClass, series, config) {
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

      series: series
    }
    
    this.chart = Highcharts.stockChart(divClass, theConfig)
  }

  update(labels, data) {
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }
}
