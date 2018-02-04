import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      series: []
    };

  }

  componentDidMount() {
    this.getStocks();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
