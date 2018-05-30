import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Link,
	Redirect,
} from 'react-router-dom';

import * as aData from '../actions/data';
import Person from './Person';
import moment from "moment"

class LoginForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	componentDidMount() {
		this.props.dispatch(aData.getData("roomcounter"));
		var I = setInterval(() => {
			this.props.dispatch(aData.getData("roomcounter"));
		}, 1000)
		this.setState({ I: I});
	}

	componentWillUnmount() {
		clearInterval(this.state.I);
	}

	render() {
		var loaded = this.props.roomCounter ? true : false;
		var nPeople = 0;
		if (loaded && this.props.roomCounter.Events && this.props.roomCounter.Events.length) {
			nPeople = this.props.roomCounter.Events.length;
		}
		if (loaded) console.log(this.props.roomCounter.TimeStampEpoch)

		return (
			<div className="login-form">
				<Link to="/roomcounter" style={{float:"left"}}>Room Counter</Link>
				<Link to="/doorevents" style={{float:"right"}}>Door Events</Link>
				<h1>
					Room Counter
				</h1>
				{
					loaded && <div>
						<div>
							Latest packet received at <br/>
							<b>{moment.unix(Number(this.props.roomCounter.TimeStampEpoch)).format("MMMM Do YYYY, h:mm:ss a")}</b><br/>
						</div>
						<i>
						<div>
							<br/>
							There are <b>{nPeople}</b> people in the room.<br/>
							{
								this.props.roomCounter.Events.map((x, i) => {
									return <Person key={i} trackId={x.trackID} since={Number(this.props.roomCounter.TimeStampEpoch) - Number(x.dwellTime)}/>
								})
							}
							<br/>
						</div>
						<div>
							Note : each person is identified by his/her color.
						</div>
						</i>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roomCounter: state.dataReducer.roomcounter,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);