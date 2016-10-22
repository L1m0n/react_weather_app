import React, { Component } from 'react';

export default class Plot extends Component {

	drawPlot(){
		Plotly.newPlot('plot', [{
			x:this.props.xData,
			y:this.props.yData,
			type: this.props.type
		}],
		{
			margin: {
				t: 0, 
				r: 0, 
				l:30
			},
			xaxis: {
				gridcolor: 'transparent'
			}
		},
		{
			displayModeBar:false
		}
		);
		document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
	}

	componentDidMount() {
		this.drawPlot();
	}

	componentDidUpdate(){
		this.drawPlot();
	}

	render() {
		return (
			<div>
				<h2>
	               Forecast
		        </h2>
				<div id="plot"></div>
			</div>
		);
	}
}