const axios = require ("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS"
export const FILTER_ALPHABETICALLY = "FILTER_ALPHABETICALLY"
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO"
export const GET_USER_INFO = "GET_USER_INFO"
export const SEARCH_BY_DESTINATION = 'SEARCH_BY_DESTINATION'
export const ORDER_PRICE = 'ORDER_PRICE'

export const getAllFlights = () => {
    return function (dispatch) {
        axios('http://localhost:3001/flights').then((flight) => {
            dispatch({
                type: GET_ALL_FLIGHTS, 
                payload: flight.data
            })
        })
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