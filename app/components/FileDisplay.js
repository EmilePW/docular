import React from 'react';

class FileDisplay extends React.Component {
	constructor () {
		super();
	}

	render () {
		let FileDisplayStyle = {
			height: "40%",
			padding: "10px",
			textAlign: "center"
		}

		let FileDisplayHeadingStyle = {
			margin: "10px"
		}

		let FilenameStyle = {
			margin: "10px",
			color: "#555",
			fontSize: "16px",
			lineHeight: "24px"
		}

		return (
			<div
				className="file-display flex-column flex-h-center flex-v-center"
				style={FileDisplayStyle}>
				
				<h3
					className="file-display-heading"
					style={FileDisplayHeadingStyle}>

					You are currently viewing:
				</h3>
				
				<p
					style={FilenameStyle}>

					{this.props.filename}
				</p>
			</div>
		);
	}
}

export default FileDisplay;