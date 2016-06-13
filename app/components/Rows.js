import React from 'react';
import TableDatum from './TableDatum';

class Rows extends React.Component {
	constructor () {
		super();
	}

	handleCellClick (row) {
		// Tell app which row is highlighted
		return this.props.highlightData(row);
	}

	handleDoubleClick (row, col) {
		// Open input field for editing
		return this.props.initiateEditing(row, col);
	}

	handleEnterNewData (row, col, datum) {
		// Update data upon input
		return this.props.endEditing(row, col, datum);
	}

	render () {
		let TableBodyStyle = {
			overflow: "auto"
		}

		let TableRowOddStyle = {
			background: "lightgrey"
		}

		let TableRowEvenStyle = {
			background: "gainsboro"
		}

		let rowData = this.props.rowData,
				rows;

		if (rowData) {
			rows = rowData.map((row, i) => 
				<tr
					className="row"
					style={i % 2 === 0 ? TableRowEvenStyle : TableRowOddStyle}
					key={i}>
					
					{ 
						row.map((datum, j) => 
							<TableDatum
								key={j}
								datum={datum}
								rowNum={i}
								colNum={j}
								isDataBeingEdited={this.props.isDataBeingEdited}
								cellBeingEdited={this.props.cellBeingEdited}
								handleEnterNewData={this.handleEnterNewData.bind(this, i, j)}
								handleDoubleClick={this.handleDoubleClick.bind(this, i, j)}
								handleCellClick={this.handleCellClick.bind(this, i)}
								highlightedData={this.props.highlightedData} />
						)
					} 
				</tr>
			);
		}

		return (
			<tbody
				className="table-body"
				style={TableBodyStyle}>
				
				{rows}
			</tbody>			
		);
	}
}

export default Rows;