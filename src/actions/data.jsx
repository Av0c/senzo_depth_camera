import * as config from '../config';
import axios from 'axios';


export const GET_DATA = "GET_DATA"
export function getData(key, prefix) {
	return (dispatch) => {
		axios.get(config.APIBase+"/"+key + (prefix ? ("/" + prefix) : ""))
			.then((res) => {
				dispatch(receiveData(key, res.data));
			})
			.catch((res) => { console.log("error get "+key, res)});
	}	
}


export const RECEIVE_DATA = "RECEIVE_DATA"
export function receiveData(key, data) {
	return {
		type: RECEIVE_DATA,
		key,
		data
	}
}