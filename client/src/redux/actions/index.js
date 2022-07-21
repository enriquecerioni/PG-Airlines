const axios = require ("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS"
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO"
export const GET_USER_INFO = "GET_USER_INFO"
export const SEARCH_BY_DESTINATION = 'SEARCH_BY_DESTINATION'

export const ORDER_PRICE = 'ORDER_PRICE'
export const GET_FLIGHT_BY_ID = 'GET_FLIGHT_BY_ID'
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const RESET_FILTER = 'RESET_FILTER'
export const FILTER_PRICE = 'FILTER_PRICE'

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

export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY, 
        payload
    }
}

export const orderByPrice = (payload) => {
    return {
        type: ORDER_PRICE, 
        payload
    }
}

export const filterPrice= (payload) => {
    return {
        type: FILTER_PRICE,
        payload
    }
}

/////////
export function resetFilter(){
    return{
        type: RESET_FILTER
    }
}