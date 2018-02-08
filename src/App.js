import React, { Component } from 'react';
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
      series: [],
      stocks: [],
      NewStockValue: '',
      chart: null
    };
  }

  _addStock = (e) => {
    e.preventDefault();
    if (this.state.NewStockValue && !this.state.stocks.includes(this.state.NewStockValue)) {
      axios.get(`/stocks/${this.state.NewStockValue}`)
        .then((res) => {
          if (!res.data.err) {
            const series = this.state.series.slice();
            const stocks = this.state.stocks.slice()
            stocks.push(res.data.name);
            series.push(res.data)
            this.setState({ series: series });
            this.setState({ stocks: stocks });
            this.state.chart.add(res.data);
            this.socket.stockChange(res.data);
          } else {
            alert('this symbol doesnt exists');
          }
          this.setState({ NewStockValue: '' });
        })
    }
  }

  _deleteStock = (e) => {
    alert(e.target.id)
    this.socket.stockChange();
  }

  _getStocks = () => {
    axios.get('/stocks')
      .then((res) => {
        // this.setState({ stocks: res.data.map(stock => stock.name)});
      })
  }

  _stockChangeServer = (serie) => {
    if (!this.state.stocks.includes(serie.name)) {
      alert('remote update');
      this.setState({ series: this.state.series.push(serie)});
    }
  } 
  
  _handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }

  _getChart = (chart) => {
    this.setState({ chart: chart });
  }
  
  componentDidMount() {
    this.socket = new Socket();
    // this.socket.onStockChange(this._stockChangeServer);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1> Stock Market </h1>
        </header>
        <section className="app-main-section">
          <div className="app-left-container">
            <ChartView series={this.state.series} id="chart-container" getChart={this._getChart}/>
          </div>
          <div className="app-right-container">
            <StockAddForm onClick={this._addStock} onChange={this._handleInputChange} value={this.state.NewStockValue}/>
            <StockListView stocks={this.state.stocks} onDelete={this._deleteStock}/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
