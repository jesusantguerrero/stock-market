import React, { Component } from 'react';
import axios from 'axios';
import About from './components/About';
import AppHeader from './components/AppHeader';
import ChartView from './components/ChartView';
import Loader from './components/Loader';
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
      chart: null,
      showAbout: false
    };
  }

  render() {
    return (
      <div className="App">
        <AppHeader action={this._changeShowAbout}/>
        <Loader/>

        { this.state.showAbout && (<About/>) }

        <section className="app-main-section">
          <div className="app-left-container">
            <h1 className="app-section-title"> Stocks </h1>
            <ChartView series={this.state.series} id="chart-container" getChart={this._getChart}/>
          </div>
          <div className="app-right-container">
            <h1 className="app-section-title"> Control Panel</h1>
            <StockAddForm onClick={this._addStock} onChange={this._handleInputChange} value={this.state.NewStockValue}/>
            <StockListView stocks={this.state.stocks} onDelete={this._deleteStock}/>
          </div>
        </section>
      </div>
    );
  }


  //  server related functions

  _addStock = (e) => {
    e.preventDefault();
    if (this.state.NewStockValue && !this.state.stocks.includes(this.state.NewStockValue)) {
      this.showLoader();
      this._getStock(this.state.NewStockValue)
        .then((data) => {
          this.hideLoader()
          if (!data.err) {
            this.socket.stockChange('add', data);
          } else {
            alert('this symbol doesnt exists');
          }
          this.setState({ NewStockValue: '' });
        })
        .catch((err) => {
          console.log(err);
          this.hideLoader()
        })
    }
  }

  _deleteStock = (e) => {
    const stockName = e.target.name;
    this.showLoader();
    axios.delete(`/stocks/${stockName}`)
      .then((res) => {
        this.hideLoader();
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
    this.showLoader();
    axios.get('/stocks')
      .then((res) => {
        const stocks  = res.data || [];
        
        const timer = setInterval(() => {
          const seriesCount = this.state.series.length
          if (seriesCount === stocks.length) {
            clearInterval(timer)
            this.hideLoader();
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

  _changeShowAbout = (e) => {
    e.preventDefault();
    this.setState({ showAbout: !this.state.showAbout });
  }
  
  // lifecycle
  componentDidMount() {
    this.socket = new Socket();
    this.socket.onStockChange(this._stockChangeServer);
    this._getStocks();
  }

  // animations ux
  showLoader() {
    this.hideLoader();
    document.querySelector('.loader').classList.add('loading')
  }
  
  hideLoader() {
    document.querySelector('.loader').classList.remove('loading')

  }

}

export default App;
