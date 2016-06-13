import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import FontAwesome from 'react-fontawesome';
import Headings from './Headings';
import Rows from './Rows';

class Table extends React.Component {
	constructor () {
		super();
	}

	render () {
		let TableSectionStyle = {
			height: "40%",
			width: "100%",
			overflow: "auto",
			fontSize: "13px",
			background: "gainsboro",
			border: "10px solid white"
		};

		let TableStyle = {
			width: "100%"
		}

		let TableIndicatorStyle = {
			marginTop: "30px"
		};

		let TableIconStyle = {
			fontSize: "80px",
			color: "#999",
			padding: "20px"
		}

		let data = this.props.data,
				headingData,
				rowData;

		if (data && this.props.chartOptions.dataHasHeadings) {
			// Separate headings from data
			headingData = data[0];
			rowData = data.slice(1);
		}

		return (
			<section
				className="table-section"
				style={TableSectionStyle}>
				
				<ToggleDisplay
					show={!!data}>

					<table
						style={TableStyle}>

						<Headings
							headingData={headingData} />

						<Rows
							rowData={rowData}
							isDataBeingEdited={this.props.isDataBeingEdited}
							cellBeingEdited={this.props.cellBeingEdited}
							initiateEditing={this.props.initiateEditing}
							endEditing={this.props.endEditing}
							highlightData={this.props.highlightData}
							highlightedData={this.props.highlightedData} />
					</table>
				</ToggleDisplay>

				<ToggleDisplay
					show={!data}>

					<h2
						className="table-indicator text-center"
						style={TableIndicatorStyle}>

						<FontAwesome
							className="table-icon"
							style={TableIconStyle}
							name="table" />

						<br/>

						A Table of Your Data Will Appear Here
					</h2>
				</ToggleDisplay>
			</section>
		);
	}
}

export default Table;