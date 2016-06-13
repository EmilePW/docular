import React from 'react';

class Headings extends React.Component {
	constructor () {
		super();
	}

	render () {
		let HeadingStyle = {
			padding: "10px 4px",
			width: "50%",
			verticalAlign: "middle",
			background: "#222",
			color: "white"
		};

		let headingData = this.props.headingData,
				columns;

		if (headingData) {
			columns = headingData.map((heading, i) => <th key={i} style={HeadingStyle}>{heading}</th>);
		}

		return (
			<thead
				className="table-head">
				
				<tr>{columns}</tr>
			</thead>
		);
	}
}

export default Headings;