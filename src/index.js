import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {
	HashRouter,
	Route,
	Switch,
	IndexRoute,
} from 'react-router-dom';
import Store from './store';
import * as a from './actions/data';

import registerServiceWorker from "./registerServiceWorker";
import axios from "axios"

import "./css/index.css";
import "./css/animation.css";
import logo from './css/logo.svg';

import Home from "./components/Home";
import * as config from "./config"

function init() {
}

init();

ReactDOM.render((
<Provider store={Store}>
	<HashRouter onUpdate={() => window.scrollTo(0, 0)}>
		<Switch>
			<Route path="/" component={Home}/>
		</Switch>
	</HashRouter>
</Provider>
), document.getElementById("root"));
registerServiceWorker();
