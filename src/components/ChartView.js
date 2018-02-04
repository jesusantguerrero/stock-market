import React, { Component } from 'react';
import StockChart from './StockChart';

export default class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    }
  }

  componentDidMount(){
    this.chart();
  }

  render() {
    return(
      <div id={this.props.id}>
      </div>
    )
  }

  chart() {
    const chart = new StockChart(this.props.id, this.props.series, {});
    this.setState({ chart: chart });
  }
}