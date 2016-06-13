import React from 'react';
import Chart from './Chart';
import Table from './Table';

class DataDisplay extends React.Component {
	constructor () {
		super();
	}

	render () {
		let DataDisplayStyle = {
			height: "100%",
			width: "80%",
			float: "right",
			padding: "10px"
		}

		let ChartSectionStyle = {
			width: "100%",
			height: "60%",
			background: "#eee",
			border: "10px solid white"
		}

		return (
			<main
				className="data-display"
				style={DataDisplayStyle}>
				
				<section
					className="chart-section"
					style={ChartSectionStyle}>
					
					<Chart
						data={this.props.data}
						chartOptions={this.props.chartOptions}
						highlightData={this.props.highlightData}
						highlightedData={this.props.highlightedData} />
				</section>
				
				<Table
					data={this.props.data}
					chartOptions={this.props.chartOptions}
					isDataBeingEdited={this.props.isDataBeingEdited}
					cellBeingEdited={this.props.cellBeingEdited}
					initiateEditing={this.props.initiateEditing}
					endEditing={this.props.endEditing}
					highlightData={this.props.highlightData}
					highlightedData={this.props.highlightedData} />
			</main>
		);
	}
}

export default DataDisplay;