import React, { Component } from 'react';
import xhr from 'xhr';
import Plot from './Plot.js';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      location: "",
      data: {},
      dates:[],
      temps:[]
    }
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);  
  }


  fetchData(evt){
    evt.preventDefault();
    var location = encodeURIComponent(this.state.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=e72e82ac63de6dfdf0654ba239864bfa&units=metric';
    var url = urlPrefix + location + urlSuffix;
    var self = this;
    xhr({
      url:url
    }, function(err, data){
      var body = JSON.parse(data.body);
      var list = body.list;
      var dates = [];
      var temps =[];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      self.setState({
        data: body,
        dates: dates,
        temps: temps
      });
    });
  }

  changeLocation(evt) {
    this.setState({
      location: evt.target.value
    });
  }

  render() {
    var currentTemp = 'not loaded yet';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div className="App">
          <h2>Weather app</h2>
          <form onSubmit={this.fetchData}>
            <label>I want to know the weather for <br />
              <input 
                placeholder={"City, Country"} 
                type="text"
                value={this.state.location}
                onChange={this.changeLocation} 
              />
            </label>
          </form>
          {(this.state.data.list) ? (
            <div>
              <p className="temp-wrapper">
                <span className="temp">{currentTemp}</span>
                <span className="temp-symbol">°C</span>
              </p>
              <h2>
                Forecast
              </h2>
              <Plot 
                xData={this.state.dates}
                yData={this.state.temps}
                type="scatter" />
              </div>    
            ) : null}
      </div>
    );
  }

}
