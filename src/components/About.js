import React from 'react';
import './../assets/css/About.css';

export default () => {
  return(
    <div className="about">
      <header>
        <h1> About </h1>
      </header>
      <section>
        <h3> Technologies and API's </h3>
        <ul className="technologies">
          <li>
            <a href="#"> Highcharts</a>
          </li>
          <li>
            <a href="#"> Alphadvange</a>
          </li>
          <li>
            <a href="#"> React</a>
          </li>
          <li>
            <a href="#"> Express</a>
          </li>
          <li> <a href="#">MongoDB and Mongoose</a> </li>
        </ul>
      </section>
      <footer>
        by <a href="https://jesusantguerrero.com">@jesusantguerrero</a>
      </footer>
    </div>
  )
}