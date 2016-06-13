import React from 'react';
import d3 from 'd3';
import Dimensions from 'react-dimensions';
import XAxis from './XAxis';
import YAxis from './YAxis';
import ToggleDisplay from 'react-toggle-display';
import ScatterPoint from './ScatterPoint';
import Bar from './Bar';

class Chart extends React.Component {
	constructor () {
		super();
	}

	handleParamClick (row) {
		// For click of e.g. a scatter point or bar
		this.props.highlightData(row);
	}

	render () {
		let ScrollerStyle = {
			width: "100%",
			height: "100%",
			overflowX: "auto",
			overflowY: "hidden"
		};

		let ChartContainerStyle = {
			width: this.props.containerWidth,
			height: this.props.containerHeight,
		};

		let SVGStyle = {
			width: "100%",
			height: "100%"
		};

		let chartOptions = this.props.chartOptions,
				data = this.props.data,
				headings = [],

				width = this.props.containerWidth,
				height = this.props.containerHeight,
				padding = 100,

				// Minimum and maxium points are used to scale the chart
				xMinimum,
				xMaximum,
				yMinimum,
				yMaximum,

				xScale,
				yScale,

				// Generic variable used to plot data e.g. bars or scatter points
				dataParams,

				// Move X-axis to the bottom and Y-Axis to the left
				translateXAxis = `translate(0, ${height - padding})`,
				translateYAxis = `translate(${padding}, 0)`;

		if (chartOptions.dataHasHeadings) {
			headings = data[0];
			data = data.slice(1);
		}

		if (chartOptions.chartType === "scatter") {
			xMinimum = d3.min(data, (d) => d[0]);
			xMaximum = d3.max(data, (d) => d[0]);
			yMinimum = d3.min(data, (d) => d[1]);
			yMaximum = d3.max(data, (d) => d[1]);
			
			xScale = d3.scale.linear().domain([xMinimum, xMaximum]).range([padding, width - padding]);
			yScale = d3.scale.linear().domain([yMinimum, yMaximum]).range([height - padding, padding / 2]);
			
			// Convert data to scatter point components for chart
			dataParams = data.map((point, i) => 
				<ScatterPoint
					key={i}
					circleNum={i}
					xCoord={xScale(point[0])}
					yCoord={yScale(point[1])}
					handleParamClick={this.handleParamClick.bind(this, i)}
					highlightedData={this.props.highlightedData}
				/>
			);
		}
		else if (chartOptions.chartType === "bar") {
			// Ensure svg is wide enough to accomodate all data points
			width = this.props.containerWidth > data.length * 60 ? this.props.containerWidth : data.length * 60;

			ChartContainerStyle = {
				width: width,
				height: height
			}

			let labels = data.map((row) => row[0]);
			let values = data.map((row) => row[1]);
			
			yMinimum = d3.min(values, (d) => d);
			yMaximum = d3.max(values, (d) => d);
			
			xScale = d3.scale.ordinal().domain(labels).rangePoints([padding, width - padding], 0.5);
			yScale = d3.scale.linear().domain([0, yMaximum]).range([height - padding, padding / 2]);

			// Convert data to bar components for chart
			dataParams = values.map((val, i) =>
				<Bar
					key={i}
					barNum={i}
					x={xScale(labels[i]) - 10}
					y={height - padding / 2 - yScale(yMaximum - val)}
					height={yScale(yMaximum - val) - padding / 2}
					handleParamClick={this.handleParamClick.bind(this, i)}
					highlightedData={this.props.highlightedData} 
				/>
			);
		}

		return (			
				<div
					className="scroller"
					style={ScrollerStyle}>
					
					<section
						className="chart-container center-child"
						style={ChartContainerStyle}>
						
						<svg
							style={SVGStyle}>
							
							{dataParams}
							
							<XAxis
								scale={xScale}
								translate={translateXAxis} />
							
							<YAxis
								scale={yScale}
								translate={translateYAxis} />
							
							<text
								className="x-axis-label"
								x={width / 2 - 50}
								y={height - padding / 2}>

								{headings[0]}
							</text>
							
							<text
								className="y-axis-label"
							 	x={-height * 0.6}
								dy={50}
								transform="rotate(-90)">

								{headings[1]}
							</text>
						</svg>
					</section>
				</div>
		);
	}
}

export default Dimensions()(Chart);