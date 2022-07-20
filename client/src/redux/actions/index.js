const axios = require ("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS"
export const FILTER_ALPHABETICALLY = "FILTER_ALPHABETICALLY"
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO"
export const GET_USER_INFO = "GET_USER_INFO"

export const getAllFlights = () => {
    return async function (dispatch) {
       fetch('LINK')
       .then(r => r.json())
       .then(data => dispatch({type: GET_ALL_FLIGHTS, payload: data}));
    }
}

export const getFlightInfo = () => {
    return async function (dispatch) {
       fetch('LINK')
       .then(r => r.json())
       .then(data => dispatch({type: GET_FLIGHT_INFO, payload: data}));
    }
}

export const filterAlphabetically = (payload) => {
    return {type: FILTER_ALPHABETICALLY, payload}
}