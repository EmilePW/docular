import React from 'react';
import FontAwesome from 'react-fontawesome';

class DataInput extends React.Component {
	constructor () {
		super();
	}

	onEnterData () {
		let newValue = this.refs[`dataInput-${this.props.rowNum}-${this.props.colNum}`].value;

		if (newValue !== this.props.val && newValue !== "") {
			return this.props.handleEnterNewData(newValue);
		}
		// Otherwise leave the old value intact
		else {
			return this.props.handleEnterNewData(undefined);
		}
	}

	cancelInput () {
		// If no data was intended to be updated, pass undefined value to avoid updating
		return this.props.handleEnterNewData(undefined);
	}

	render () {
		let DataInputStyle = {
			width: "70%",
			height: "30px",
			background: "none",
			border: "none",
			outline: "none",
			color: "white",
			float: "left",
			outline: "none",
			textAlign: "center"
		};

		let InputFlowStyle = {
			width: "30%",
			float: "right",
			height: "30px",
			display: "flex",
			justifyContent: "space-around",
			alignItems: "center"
		}

		let ConfirmNewInputStyle = {
			width: "25px",
			height: "25px",
			float: "left",
			outline: "none",
			border: "none",
			borderRadius: "5px",
			background: "#111",
			color: "forestgreen"
		}

		let CancelNewInputStyle = {
			width: "25px",
			height: "25px",
			float: "right",
			outline: "none",
			border: "none",
			borderRadius: "5px",
			background: "#111",
			color: "red"
		}

		return (
			<div
				className="data-input-container">
				
				<input
					ref={`dataInput-${this.props.rowNum}-${this.props.colNum}`}
					className="data-input"
					style={DataInputStyle}
					type={this.props.type}
					placeholder={this.props.val} />
				
				<div
					className="input-flow"
					style={InputFlowStyle}>

					<button
						className="confirm-new-input"
						style={ConfirmNewInputStyle}
						onClick={this.onEnterData.bind(this)}>
						
						<FontAwesome name="check" />
					</button>
					
					<button
						className="cancel-new-input"
						style={CancelNewInputStyle}
						onClick={this.cancelInput.bind(this)}>
						
						<FontAwesome name="close" />
					</button>
				</div>
			</div>
		);
	}
}

export default DataInput;