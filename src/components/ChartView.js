import React, { Component } from 'react';
import StockChart from './StockChart';
import './../assets/css/App.css';

export default class ChartView extends Component {
  componentDidMount(){
    this.chart();
  }

  render() {
    return(
      <div id={this.props.id} className="chart-container">
      </div>
    )
  }

  chart() {
    const chart = new StockChart(this.props.id, this.props.series, {});
    this.props.getChart(chart)
  }
}