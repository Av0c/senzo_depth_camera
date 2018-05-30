import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { install, combineReducers } from 'redux-loop';
import axios from 'axios';

import dataReducer from './reducers/data';

const reducer = combineReducers({
	dataReducer,
});

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunkMiddleware),
		install()
	)
);


export default store;
