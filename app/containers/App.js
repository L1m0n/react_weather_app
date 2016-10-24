import React, {Component} from 'react';
import {connect} from 'react-redux';
import Plot from '../components/Plot.js';
import {jsonp} from '../services/jsonp.js';
import {changeLocation,
        setData,
        setDates,
        setTemps,
        setSelectedTemp,
        setSelectedDate
} from '../actions/actions.js';

require('./App.scss');
class App extends Component {

  constructor(props) {

    super(props);

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
    var location = encodeURIComponent(this.props.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?callbackName=handleStuff&q=';
    var urlSuffix = '&APPID=e72e82ac63de6dfdf0654ba239864bfa&units=metric';
    var url = urlPrefix + location + urlSuffix;
    var self = this;

    this.props.dispatch(fetchData(url));
  }

  onPlotClick(data){
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(this.props.dates[number]));
      this.props.dispatch(setSelectedTemp(this.props.temps[number]))
    }
  }

  changeLocation(evt) {
    this.props.dispatch(changeLocation(evt.target.value));
  }

  render() {
    var currentTemp = 'not loaded yet';
    if (this.props.data.list) {
      currentTemp = this.props.data.list[0].main.temp;
    }
    return (
      <div className="App">
          <h1>Weather app</h1>
          <form onSubmit={this.fetchData}>
            <label>I want to know the weather for <br />
              <input 
                placeholder={"City, Country"} 
                type="text"
                value={this.props.location}
                onChange={this.changeLocation} 
              />
            </label>
          </form>
          {(this.state.data.list) ? (
            <div>
              <p>
                {
                  (this.props.selected.temp) ? (
                    <p>The temperature on { this.props.selected.date } will be { this.props.selected.temp }°C</p>
                  ) :
                  (<p>The current temperature is { currentTemp }°C!</p>
                  )
                }
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

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);