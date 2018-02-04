import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import TestResponse from './components/TestResponse';
import ChartView from './components/ChartView';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      series: [
        { name: 'TEST', data: TestResponse }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <h1> Stock Market </h1>
        <ChartView series={this.state.series} id="chart-container"/>
      </div>
    );
  }

  getStocks() {
    axios.get('https://www.highcharts.com/samples/data/GOOG-c.json?origin=*', {

    })
    .then((data) => {
      const series = {
          name: 'GOOG',
          data: data
      };
      this.setState({ series: series });
    })
  }
}

export default App;
