import React from 'react';

class ScatterPoint extends React.Component {
	constructor () {
		super();
	}

	render () {
		let ScatterPointStyle = {
			width: "10px",
			height: "10px",
			fill: "forestgreen",
			borderRadius: "100%",
			display: "inline-block"
		};

		if (this.props.highlightedData === this.props.circleNum) {
			// Change colour if this scatter point is highlighted
			ScatterPointStyle.fill = "darkred";
		}
		else {
			ScatterPointStyle.fill = "forestgreen";
		}

		return (
			<circle
				className="scatter"
				style={ScatterPointStyle}
				onClick={this.props.handleParamClick}
				cx={this.props.xCoord}
				cy={this.props.yCoord}
				r="5" />
		);
	}
}

export default ScatterPoint;