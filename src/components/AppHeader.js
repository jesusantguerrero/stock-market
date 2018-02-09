import React from 'react';
import './../assets/css/AppHeader.css';

const AppHeader = (props) => {
  return(
    <header className="app-header">
      <h1 className="app-title"> 
        <a href="/"> Stock Market </a>
        <a className="phone-title" href="/"> SM </a>
      </h1>
      <menu className="main-menu">
        <li><a className="menu-btn" href="https://github.com/jesusantguerrero/stock-market">GitHub</a></li>
        <li><a className="menu-btn remark" href="#" onClick={props.action}> About</a></li>
      </menu>
    </header>
  )
}

export default AppHeader