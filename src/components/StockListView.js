import React, { Component } from 'react';
import './../assets/css/StockListView.css';

export default class StockListView extends Component {
  render() {
    return(
      <div className="stock-list-view">
        {this.ListItems()}
      </div>
    )
  }

  ListItems() {
    return this.props.stocks.map((item) => {
      return(
        <div className="stock-item">
          <h1 className="stock-title"> Example </h1>
          <p className="stock-description"> Yahoo! Inc. (YHOO) Prices, Dividends, Splits and Trading Volume </p>
          <button className="stock-btn-delete"> x </button>
        </div>
      )
    })
  }
}