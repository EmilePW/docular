import React from "react";
import ToggleDisplay from "react-toggle-display";

class OptionsForm extends React.Component {
	constructor () {
		super();
	}

	handleInputChange (e) {
		let updatedOption = {};

		switch (e.target.name) {
			case "dataHasHeadings":
				// Convert string to boolean
				updatedOption["dataHasHeadings"] = !!parseInt(e.target.value);
				break;
			case "chartType":
				updatedOption["chartType"] = e.target.value;
				break;
			case "columnOnXAxis":
				// Column number should be zero indexed
				updatedOption["columnOnXAxis"] = e.target.value - 1;
				break;
			case "columnOnYAxis":
				// Column number should be zero indexed
				updatedOption["columnOnYAxis"] = e.target.value - 1;
				break;
		}

		// Update chart options for app
		this.props.handleChartOptions(updatedOption);
	}

	render () {
		let OptionsFormStyle = {
			position: "absolute",
			zIndex: "2",
			width: "500px",
			height: "550px",
			transform: "translate(-50%, -50%)",
			left: "50%",
			top: "50%",
			border: "1px solid #222",
			padding: "50px",
			textAlign: "center",
			background: "lightgrey",
			color: "#222"
		};

		let QAndAStyle = {
			margin: "40px auto"
		}

		let QuestionStyle = {
			margin: "10px auto"
		}

		let LabelStyle = {
			margin: "auto 10px"
		}

		let ChooseFileStyle = {
			height: "40px",
			width: "180px",
			float: "left",
			background: "forestgreen",
			color: "white",
			border: "2px solid forestgreen",
			borderRadius: "10px"
		}

		let CancelUploadStyle = {
			height: "40px",
			width: "180px",
			float: "right",
			background: "forestgreen",
			color: "white",
			border: "2px solid forestgreen",
			borderRadius: "10px"
		}

		return (
			<div
				className="options-form"
				style={OptionsFormStyle}>
				
				<h3>Just A Few Questions First</h3>
				
				<ul
					className="options">
					
					<li
						className="q-and-a"
						style={QAndAStyle}>	
						
						<p
							className="question"
							style={QuestionStyle}>
							
							Do the CSV columns have headings?
						</p>
						
						<section
							className="answer">
							
							<label>
								Yes

								<input
									type="radio"
									name="dataHasHeadings"
									value="1"
									onChange={this.handleInputChange.bind(this)} />
							</label>
							
							<label>
								No

								<input
									type="radio"
									name="dataHasHeadings"
									value="0"
									onChange={this.handleInputChange.bind(this)} />
							</label>
						</section>
					</li>
					
					<li
						className="q-and-a"
						style={QAndAStyle}>
						
						<p
							className="question"
							style={QuestionStyle}>
							
							What type of chart should this be?
						</p>
						
						<section
							className="answer">
							
							<label>
								Scatter

								<input
									type="radio"
									name="chartType"
									value="scatter"
									onChange={this.handleInputChange.bind(this)} />
							</label>
							
							<label>
								Bar

								<input
									type="radio"
									name="chartType"
									value="bar"
									onChange={this.handleInputChange.bind(this)} />
							</label>
						</section>
					</li>
					
					<li
						className="q-and-a"
						style={QAndAStyle}>
						
						<p
							className="question"
							style={QuestionStyle}>
							
							Which CSV column would you like to plot on the x-axis?
						</p>
						
						<section
							className="answer">
							
							<input
								type="number"
								name="columnOnXAxis"
								placeholder="1"
								onChange={this.handleInputChange.bind(this)} />
						</section>
					</li>
					
					<li
						className="q-and-a"
						style={QAndAStyle}>
						
						<p className="question"
							style={QuestionStyle}>

							Which CSV column would you like to plot on the y-axis?
						</p>
						
						<section className="answer">		
							<input
								type="number"
								name="columnOnYAxis"
								placeholder="2"
								onChange={this.handleInputChange.bind(this)} />
						</section>
					</li>
				</ul>

				<button
					className="choose-file"
					style={ChooseFileStyle}
					onClick={this.props.openUploader}>

					Choose File
				</button>

				<button
					className="cancel-upload"
					style={CancelUploadStyle}
					onClick={this.props.toggleOptionsForm}>

					Cancel
				</button>
			</div>
		);
	}
}

export default OptionsForm;