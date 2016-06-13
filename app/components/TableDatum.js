import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import DataInput from './DataInput';

class TableDatum extends React.Component {
	constructor () {
		super();
	}

	render () {
		// Change styles if row is highlighted (clicked on)
		let TableDatumStyle = {
			background: "none",
			width: "50%",
			height: "30px",
			verticalAlign: "middle",
			padding: "0 100px",
			textAlign: "center"
		};

		if (this.props.highlightedData === this.props.rowNum) {
			TableDatumStyle.background = "darkred";
		}
		else {
			TableDatumStyle.background = "none";
		}

		// Need to know they type of the data for the input field
		let typeOfInput;
		if (typeof this.props.datum == "string") {
			typeOfInput = "text";
		}
		else if (typeof this.props.datum === "number") {
			typeOfInput = "number"
		}

		// Only show input field for the cell that was double clicked on
		let thisCellIsBeingEdited = this.props.isDataBeingEdited && this.props.cellBeingEdited[0] === this.props.rowNum && this.props.cellBeingEdited[1] === this.props.colNum;

		return (
			<td
				className="datum"
				style={TableDatumStyle}
				onClick={this.props.handleCellClick}
				onDoubleClick={this.props.handleDoubleClick}>
				
				<ToggleDisplay
					show={!thisCellIsBeingEdited}>

					{this.props.datum}
				</ToggleDisplay>

				<ToggleDisplay
					show={thisCellIsBeingEdited}>
					
					<DataInput
						rowNum={this.props.rowNum}
						colNum={this.props.colNum}
						val={this.props.datum}
						type={typeOfInput}
						handleEnterNewData={this.props.handleEnterNewData} />
				</ToggleDisplay>
			</td>
		);
	}
}

export default TableDatum;