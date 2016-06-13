import React from 'react';

class Bar extends React.Component {
	constructor () {
		super();
	}

	render () {
		let BarStyle = {
			fill: "forestgreen"
		};

		if (this.props.highlightedData === this.props.barNum) {
			// Change colour if this bar is highlighted
			BarStyle.fill = "darkred";
		}
		else {
			BarStyle.fill = "forestgreen";
		}

		return (
			<rect
				className="bar"
				style={BarStyle}
				x={this.props.x}
				y={this.props.y}
				width="20"
				height={this.props.height}
				onClick={this.props.handlePointClick} />
		);
	}
}

export default Bar;