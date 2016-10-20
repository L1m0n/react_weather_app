import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import xhr from 'xhr';

let url = 'http://api.openweathermap.org/data/2.5/forecast?q=CITY,COUNTRY&APPID=e72e82ac63de6dfdf0654ba239864bfa&units=metric';
class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      location: "",
      data: {}
    }
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);  
  }

  componentDidUpdate(){
    console.log(11111111);
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
      self.setState({
        data: JSON.parse(data.body)
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
          <p className="temp-wrapper">
            <span className="temp">{currentTemp}</span>
            <span className="temp-symbol">°C</span>
          </p>
      </div>
    );
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

