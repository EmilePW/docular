import React from 'react';
import Title from './Title';
import FileDisplay from './FileDisplay';
import Uploader from './Uploader';

class Sidebar extends React.Component {
	constructor () {
		super();
	}

	render () {
		let SidebarStyle = {
			width: "20%",
			height: "100%",
			float: "left",
			background: "#111",
			color: "white"
		}

		return (
			<nav
				className="sidebar"
				style={SidebarStyle}>
				
				<Title name="docular" />
				
				<FileDisplay filename={this.props.filename} />
				
				<Uploader
					handleCSV={this.props.handleCSV}
					handleChartOptions={this.props.handleChartOptions}
					toggleOptionsForm={this.props.toggleOptionsForm}
					showOptionsForm={this.props.showOptionsForm} />
			</nav>
		);
	}
}

export default Sidebar;