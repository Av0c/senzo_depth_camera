import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeImage from "../assets/home.png"
import {
	Route,
	Link,
	Redirect,
} from 'react-router-dom'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export class ItemForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<Route exact path="/" component={LoginForm}/>
				<Route path="/roomcounter" component={LoginForm}/>
				<Route path="/doorevents" component={RegisterForm}/>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.dataReducer.users,
		auth: state.authReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);