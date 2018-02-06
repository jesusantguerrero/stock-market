import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import axios from 'axios';
import TestResponse from './components/TestResponse';
import ChartView from './components/ChartView';
import StockListView from './components/StockListView';
import StockAddForm from './components/StockAddForm';
import Socket from './components/Socket';
import './assets/css/App.css';

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
    this.setState({ NewStockValue: '' });
    this.socket.stockChange()
    e.preventDefault();
  }

  _deleteStock = (e) => {
    alert(e.target.id)
    this.socket.stockChange();
  }

  _getStocks = () => {
    axios.get('/stocks')
      .then((stocks) => {
        this.setState({ stocks: stocks });
      })
  }
  
  _handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }
  
  componentDidMount() {
    this.socket = new Socket();
    this.socket.onStockChange(this._getStocks);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1> Stock Market </h1>
        </header>
        <section className="app-main-section">
          <div className="app-left-container">
            <ChartView series={this.state.series} id="chart-container"/>
          </div>
          <div className="app-right-container">
            <StockAddForm onClick={this._addStock} onChange={this._handleInputChange} value={this.state.NewStockValue}/>
            <StockListView stocks={[1, 2]} onDelete={this._deleteStock}/>
          </div>
        </section>
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
