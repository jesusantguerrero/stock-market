import React, { Component } from 'react';
import axios from 'axios';
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

  //  server related functions

  _addStock = (e) => {
    e.preventDefault();
    if (this.state.NewStockValue && !this.state.stocks.includes(this.state.NewStockValue)) {
      this._getStock(this.state.NewStockValue)
        .then((data) => {
          if (!data.err) {
            this.socket.stockChange('add', data);
          } else {
            alert('this symbol doesnt exists');
          }
          this.setState({ NewStockValue: '' });
        })
    }
  }

  _deleteStock = (e) => {
    const stockName = e.target.name;
    axios.delete(`/stocks/${stockName}`)
      .then((res) => {
        if (res.data) {
          this._removeSerie(stockName);
          this.socket.stockChange('delete', stockName);
        }
      })
  }
    
  _getStock = (name) => {
    return axios.get(`/stocks/${name}`)
      .then((res) => {
        if (!res.data.err) {
           this._addSerie(res.data)        
        }
        return res.data;
      })
  }

  _getStocks = () => {
    axios.get('/stocks')
      .then((res) => {
        const stocks  = res.data || [];
        let lastNumber = 0;
        
        const timer = setInterval(() => {
          const seriesCount = this.state.series.length
          if (seriesCount === stocks.length || seriesCount === lastNumber) {
            clearInterval(timer)
          } else {
            lastNumber = seriesCount;
          }
        }, 2000);

        stocks.sort().forEach((stock) => {
          this._getStock(stock)
        })
      })
  }

  _stockChangeServer = (method, serie) => {
    return (method === 'delete') ? this._removeSerie(serie) : this._addSerie(serie);
  } 
  
  //  local state functions
  _handleInputChange = (e) => {
    this.setState({ NewStockValue: e.target.value });
  }

  _getChart = (chart) => {
    this.setState({ chart: chart });
  }

  _addSerie = (serie) => {
    const series = this.state.series.slice();
    const stocks = this.state.stocks.slice()
    if (!stocks.includes(serie.name)) {
      stocks.push(serie.name);
      series.push(serie)
      this.setState({ series: series });
      this.setState({ stocks: stocks });
      this.state.chart.add(serie); 
    }
  }

  _removeSerie = (serieName) => {
    const series = this.state.series.slice();
    const stocks = this.state.stocks.slice();
    //  find  the index
    const stockIndex = stocks.findIndex((name) => (name === serieName));
    const serieIndex = stocks.findIndex((serie) => (serie.name === serieName));

    stocks.splice(stockIndex, 1);
    series.splice(serieIndex, 1)

    this.setState({ series: series });
    this.setState({ stocks: stocks });

    this.state.chart.update(this.state.series); 
  }
  
  // lifecycle
  componentDidMount() {
    this.socket = new Socket();
    this.socket.onStockChange(this._stockChangeServer);
    this._getStocks();
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title"> 
            <a href="/"> Stock Market </a>
          </h1>
          <menu className="main-menu">
            <li className="menu-btn">GitHub</li>
            <li className="menu-btn remark">About</li>
          </menu>
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

  // animations ux
}

export default App;
