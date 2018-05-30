import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Link,
	Redirect,
} from 'react-router-dom';

import * as aData from '../actions/data';
import IOEvent from './InOutEvent';
import moment from "moment"

class RegisterForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			allow: 99999999999,
		};
	}


	componentDidMount() {
		this.fetchData()
		var I = setInterval(() => this.fetchData(), 1500);
		this.setState({ I: I });
	}

	componentWillUnmount() {
		clearInterval(this.state.I);
	}

	fetchData() {
		// fetch history starting from last 5:00 am
		var t = moment().startOf('day').add(5, "hours");
		if (t.unix() > moment().unix()) {
			t = t.subtract(1, "days");
		}

		this.setState({ from: t.unix() })
		this.props.dispatch(aData.getData("doorevents", t.unix()))
	}

	render() {
		var diff = 0;
		if (this.props.doorEvents) {
			this.props.doorEvents.forEach((x, i) => {
				if (this.props.doorEvents.length - i > this.state.allow) {
					return;
				}
				diff+= x.inOrOut;
			})
		}

		return (
			<div className="login-form">
				<Link to="/roomcounter" style={{float:"left"}}>Room Counter</Link>
				<Link to="/doorevents" style={{float:"right"}}>Door Events</Link>
				<h1>
					Door Events
				</h1>
				<div>
					From <b>{moment.unix(this.state.from).format("MMMM Do YYYY, h:mm:ss a")}</b> till now.
					<br/>
					<span style={{color:"green"}}>In</span> - <span style={{color:"red"}}>Out</span> = <b>{diff}</b>

				</div>

				{
					this.props.doorEvents && this.props.doorEvents.map((x, i) => {
						if (this.props.doorEvents.length - i > this.state.allow) {
							return null;
						}
						return <IOEvent type={x.inOrOut} since={x.timestamp} key={x.timestamp}/>
					})
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		doorEvents: state.dataReducer.doorevents,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);