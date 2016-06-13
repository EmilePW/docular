import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import Sidebar from './Sidebar';
import DataDisplay from './DataDisplay';
import Message from './Message';

class Docular extends React.Component {
	constructor () {
		super();

		// Initial state
		this.state = {
			csvData: undefined,
			// Assume CSV file does have headings
			dataHasHeadings: true,
			filename: 'No File Selected',
			// Scatter graph is the default
			chartType: 'scatter',
			// Assume the first two columns are plotted against each other as default
			columnOnXAxis: 0,
			columnOnYAxis: 1,
			showOptionsForm: false,
			showMessage: false,
			lastMessageText: '',
			lastMessageColor: '#222',
			highlightedData: undefined,
			isDataBeingEdited: false,
			cellBeingEdited: [undefined, undefined]
		}
	}

	sendMessage (msg, style) {
		// Display message box for informing users of errors, etc.
		let styleToColor = {
			"goodnews": "green",
			"badnews": "red",
			"neutral": "#222"
		}

		if (!style) {
			style = "neutral";
		}

		return this.setState({
			showMessage: true,
			lastMessageText: msg,
			lastMessageColor: styleToColor[style]
		});
	}

	hideMessageBox () {
		return this.setState({
			showMessage: false
		})
	}

	toggleOptionsForm () {
		let showOptionsForm = !this.state.showOptionsForm;

		return this.setState({
			showOptionsForm: showOptionsForm
		});
	}

	handleChartOptions (options) {
		// Update user-entered chart options from the form
		return this.setState(options);
	}

	getChartOptions () {
		// Chart options data to send to chart and table
		return {
			dataHasHeadings: this.state.dataHasHeadings,
			chartType: this.state.chartType,
			columnOnXAxis: this.state.columnOnXAxis,
			columnOnYAxis: this.state.columnOnYAxis
		};
	}

	highlightData (row) {
		// Designate which row of data is selected by user
		return this.setState({
			highlightedData: row
		})
	}

	initiateEditing (row, col) {
		// Used to show input option for user to update data
		return this.setState({
			isDataBeingEdited: true,
			cellBeingEdited: [row, col]
		})
	}

	endEditing (row, col, datum) {
		if (!datum) {
			// If no new data is supplied, end editing without update
			return this.setState({
				highlightedData: undefined,
				isDataBeingEdited: false,
				cellBeingEdited: [undefined, undefined]
			});
		}
		else {
			// If data is supplied, update the stored data across the app
			let updatedData = this.state.csvData;

			let originalColumn;
			// Translate supplied column number to original column from the CSV file
			if (col === 0) {
				// First column in the table is for x-axis
				originalColumn = this.state.columnOnXAxis;
			}
			else {
				// Other column is for the y-axis
				originalColumn = this.state.columnOnYAxis;
			}

			if (this.state.dataHasHeadings) {
				updatedData[row + 1][originalColumn] = datum;
			}
			else {
				updatedData[row][originalColumn] = datum;
			}

			return this.setState({
				csvData: updatedData,
				highlightedData: undefined,
				isDataBeingEdited: false,
				cellBeingEdited: [undefined, undefined]
			});
		}
	}

	handleCSV (files) {
		// Only allow a single CSV file to be uploaded
		if (files.length > 1) {
			return this.sendMessage("Please only upload one CSV file at a time", "badnews");
		}

		// Only allow CSV files
		if (files[0].type !== "text/csv") {
			return this.sendMessage("Only CSV files are allowed", "badnews");
		}

		var processCSV = (e) => {
			// Split the CSV into nested arrays for easy use
			let csv = e.target.result;
			csv = csv.split("\n").map((line) => line.split(","));

			let filename = files[0].name;

			// Update the csv data across the application
			return this.setState({
				csvData: csv,
				filename: filename
			})
		};

		var handleCSVReadError = (e) => {
			// Inform users of errors upon reading the CSV file
			if (e.target.error.name === "NotReadableError") {
				console.log("Error: " + e.target.error);
				return this.sendMessage("The file reader is functioning, but it cannot read your file, please try another file", "badnews");
			}
			else if (e) {
				console.log("Error: " + e.target.error);
				return this.sendMessage("Something went wrong, please try again with a different file", "badnews");
			}
		}

		// Use HTML5 FileReader API
		if (window.FileReader) {
			// If it is working
			var fileReader = new FileReader();
			fileReader.readAsText(files[0]);

			fileReader.onload = processCSV;
			fileReader.onerror = handleCSVReadError;
		}
		else {
			return this.sendMessage("The file reader doesn't want to work in your browser, try Google Chrome?", "badnews");
		}
	}

	render () {
		let DocularStyle = {
			height: "100%",
			margin: "0 auto",
			fontFamily: "Okomito Light"
		}

		// Format data before sending to chart and table
		let data = this.state.csvData;

		if (this.state.chartType === "scatter" && data) {
			// Format data into coordinate pairs for scatter diagram
			data = data.map((row) => [row[this.state.columnOnXAxis], row[this.state.columnOnYAxis]])
								 // Remove undefined points (likely improper formatting of CSV file)
								 .filter((point) => !!point[0] && !!point[1]);
		}
		else if (this.state.chartType === "bar" && data) {
			// Format data into separate arrays of labels and values for bar chart
			data = data.map((row) => [row[this.state.columnOnXAxis], row[this.state.columnOnYAxis]])
								 // Remove undefined points (likely improper formatting of CSV file)
								 .filter((point) => !!point[0] && !!point[1]);
		}

		return (
			<div
				className="docular"
				style={DocularStyle}>
				
				<Sidebar 
					handleCSV={this.handleCSV.bind(this)} 
					handleChartOptions={this.handleChartOptions.bind(this)}
					filename={this.state.filename}
					toggleOptionsForm={this.toggleOptionsForm.bind(this)}
					showOptionsForm={this.state.showOptionsForm} />
				
				<DataDisplay 
					data={data}
				  chartOptions={this.getChartOptions()}
				  isDataBeingEdited={this.state.isDataBeingEdited}
				  initiateEditing={this.initiateEditing.bind(this)}
				  endEditing={this.endEditing.bind(this)}
				  cellBeingEdited={this.state.cellBeingEdited}
				  highlightData={this.highlightData.bind(this)}
				  highlightedData={this.state.highlightedData} />		
				
				<ToggleDisplay
					show={this.state.showMessage}>
					
					<Message
						messageText={this.state.lastMessageText}
						textColor={this.state.lastMessageColor}
						hideMessageBox={this.hideMessageBox.bind(this)} />
				</ToggleDisplay>
			</div>
		);
	}
}

export default Docular;