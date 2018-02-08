import React, { Component } from 'react';
import './../assets/css/StockAddForm.css';

export default class StockAddForm extends Component {
  render() {
    return(
      <form className="stock-add-form">
        <input className="input-add" type="text" placeholder="add stock"value={this.props.value} onChange={this.props.onChange}/>
        <input className="btn-add" type="submit" value="save" onClick={this.props.onClick}/>
      </form>
    )
  }
}