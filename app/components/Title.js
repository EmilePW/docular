import React from 'react';
import FontAwesome from 'react-fontawesome';

class Title extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		let TitleStyle = {
			padding: "10px",
			height: "20%"
		};

		let LogoBoxStyle = {
			height: "50px",
			width: "200px"
		}

		let LogoStyle = {
			fontSize: "26px"
		}

		let TitleTextStyle = {
			color: "white",
			fontSize: "16px",
			letterSpacing: "10px",
			textIndent: "5px",
			textTransform: "uppercase",
		}

		return (
			<header
				className="title center-child"
				style={TitleStyle}>
				
				<div
					className="logo-box center-child"
					style={LogoBoxStyle}>
					
					<h1
						className="title-text md-size-type text-center"
						style={TitleTextStyle}>

						<FontAwesome
							className="logo"
							style={LogoStyle}
							name="low-vision" />

						<br/>

						{this.props.name}
					</h1>
				</div>
			</header>
		);
	}
}

export default Title;