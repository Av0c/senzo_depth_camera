import React, { Component } from 'react';

import sha256 from "sha256";
import moment from "moment";
import Timestamp from "react-timestamp"

export default class Person extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	render() {
		var color = "#" + sha256(this.props.trackId).substring(0, 6);

		return (
			<div className="person-row">
				<div className="person" style={{backgroundColor: color}}/>

				<Timestamp time={this.props.since}  precision={3} autoUpdate />
			</div>
		);
	}
}