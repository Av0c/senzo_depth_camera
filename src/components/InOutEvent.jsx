import React, { Component } from 'react';

import sha256 from "sha256";
import moment from "moment";
import Timestamp from "react-timestamp"

export default class IOEvent extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			marked: false,
		};
	}

	handleClick() {
		this.setState({ marked: !this.state.marked });
	}

	render() {
		return (
			<div className={"event-row " + (this.state.marked ? "marked" : "")} onClick={() => this.handleClick()}>
				<div className="person" style={{backgroundColor: (this.props.type == 1 ? "green" : "red")}}/>

				<Timestamp time={this.props.since} format="full" />

				
			</div>
		);
	}
}