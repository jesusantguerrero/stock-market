import React, { Component } from 'react';

export default class StockAddForm extends Component {
  render() {
    return(
      <form className="stock-add-form">
        <input type="text" value={this.props.value} onChange={this.props.onChange}/>
        <input type="submit" className="btn-submit" value="save" onClick={this.props.onClick}/>
      </form>
    )
  }
}