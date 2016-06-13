import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import OptionsForm from './OptionsForm';

class Uploader extends React.Component {
	constructor () {
		super();
	}

	handleUpload () {
		let files = this.refs.csvUploader.files;
		this.props.handleCSV(files);
	}

	openUploader () {
		// Activate HTML input for files and close form
		this.refs.csvUploader.click();
		this.props.toggleOptionsForm();
	}

	render () {
		let UploaderStyle = {
			height: "40%"
		};

		let UploaderHeadingStyle = {
			margin: "10px"
		}

		let UploadButtonStyle = {
			width: "200px",
			height: "50px",
			background: "forestgreen",
			margin: "30px",
			outline: "none",
			color: "white",
			border: "none",
			borderRadius: "10px"
		}

		return (
			<div
				className="uploader flex-column flex-h-center flex-v-center"
				style={UploaderStyle}>

				<h3
					className="uploader-heading"
					style={UploaderHeadingStyle}>

					Upload A New CSV File
				</h3>
				
				<button
					className="upload-button"
					style={UploadButtonStyle}
					onClick={this.props.toggleOptionsForm}>
					
					Upload
				</button>
				
				<input
					hidden
					ref="csvUploader"
					type="file"
					onChange={this.handleUpload.bind(this)}
					accept=".csv" />
				
				<ToggleDisplay
					show={this.props.showOptionsForm}>
					
					<OptionsForm
						handleChartOptions={this.props.handleChartOptions}
						openUploader={this.openUploader.bind(this)}
						toggleOptionsForm={this.props.toggleOptionsForm} />
				</ToggleDisplay>
			</div>
		);
	}
}

export default Uploader;