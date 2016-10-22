import React, { Component } from 'react';
import Plot from '../components/Plot.js';
import {getJSON} from '../services/getjson.js';
import {jsonp} from '../services/jsonp.js';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      location: "",
      data: {},
      dates:[],
      temps:[],
      selected: {
          date:'',
          temp:null
        }
    }
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);  
    this.onPlotClick = this.onPlotClick.bind(this);
  }

  componentWillMount() {
    var self = this;
    jsonp('http://ipinfo.io?callback=handleStuff', {
        callbackName: 'handleStuff',
        onSuccess: function(json){
          self.setState({
            location:json.city
          });
        }
    });   
  }

  componentDidMount(){
    var self = this;
    setTimeout(function() {
      self.fetchData(); 
    },500)
  }

  fetchData(evt){
    if (evt) evt.preventDefault(); 
    var location = encodeURIComponent(this.state.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?callbackName=handleStuff&q=';
    var urlSuffix = '&APPID=e72e82ac63de6dfdf0654ba239864bfa&units=metric';
    var url = urlPrefix + location + urlSuffix;
    var self = this;

    getJSON(url).then(function(data) {
      var list = data.list;
      var dates = [];
      var temps =[];

      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      self.setState({
        data: data,
        dates: dates,
        temps: temps,
        selected: {
          date:'',
          temp:null
        }
      });

    }, function(status) { 
      alert('Something went wrong.');
    });
  }

  onPlotClick(data){
    if(data.points) {
      this.setState({
          selected: {
            date:data.points[0].x,
            temp:data.points[0].y
          }
      });
    }
  }

  changeLocation(evt) {
    var self = this;
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
          <h1>Weather app</h1>
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
                <span className="temp">{ this.state.selected.temp ? this.state.selected.temp : currentTemp }</span>
                <span className="temp-symbol">°C</span><br /> 
                <span className="temp-date">{ this.state.selected.temp ? this.state.selected.date : ''}</span>
              </p>
              <Plot 
                xData={this.state.dates}
                yData={this.state.temps}
                onPlotClick={this.onPlotClick}
                type="scatter" />
              </div>    
            ) : null}
      </div>
    );
  }

}
