import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import axios from 'axios';
import TestResponse from './components/TestResponse';
import ChartView from './components/ChartView';
import StockListView from './components/StockListView';
import StockAddForm from './components/StockAddForm';
import './assets/css/App.css';
import io from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      series: [
        { name: 'TEST', data: TestResponse }
      ],
      NewStockValue: '',
    };
  }
  _addStock = (e) => {
    alert(this.state.NewStockValue);
    const socket = io();
    socket.emit('stock change', this.state.NewStockValue);
    this.setState({ NewStockValue: '' });
    e.preventDefault();
  }

  _handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1> Stock Market </h1>
        <StockAddForm onClick={this._addStock} onChange={this._handleInputChange} value={this.state.NewStockValue}/>
        <ChartView series={this.state.series} id="chart-container"/>
        <StockListView stocks={[1, 2]}/>
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
