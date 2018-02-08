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
    console.log(this.props.stocks)
    return this.props.stocks.map((item, index) => {
      return(
        <div className="stock-item" key={item}>
          <h1 className="stock-title"> {item} </h1>
          <p className="stock-description"> {item} Prices, Dividends, Splits and Trading Volume </p>
          <button id={index} name={item} className="stock-btn-delete" onClick={this.props.onDelete}> x </button>
        </div>
      )
    })
  }
}