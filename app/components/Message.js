import React from 'react';

class Message extends React.Component {
	constructor () {
		super();
	}

	render () {
		let MessageStyle = {
			zIndex: "3",
			position: "absolute",
			height: "300px",
			width: "500px",
			textAlign: "center",
			transform: "translate(-50%, -50%)",
			left: "50%",
			top: "50%",
			background: "#eee",
			border: "1px solid #222",
			padding: "20px",
		};

		let textStyle = {
			height: "80%",
			color: this.props.textColor
		};

		let MessageCloseStyle = {
			height: "40px",
			width: "180px",
			background: "forestgreen",
			color: "white",
			border: "none",
			outline: "none",
			borderRadius: "10px"
		};

		return (
			<div
				className="message"
				style={MessageStyle}>
				
				<p
					className="text center-child"
					style={textStyle}>
					
					{this.props.messageText}
				</p>
				
				<button
					className="message-close center-self"
					style={MessageCloseStyle}
					onClick={this.props.hideMessageBox}>
					
					Close
				</button>
			</div>
		);
	}
}

export default Message;