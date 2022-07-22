const axios = require ("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS"
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO"
export const GET_USER_INFO = "GET_USER_INFO"
export const SEARCH_BY_DESTINATION = 'SEARCH_BY_DESTINATION'
export const CLEAN = 'CLEAN'

export const ORDER_PRICE = 'ORDER_PRICE'
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const RESET_FILTER = 'RESET_FILTER'
export const FILTER_PRICE = 'FILTER_PRICE'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const FILTER_BY_AIRLINES = 'FILTER_BY_AIRLINES'
export const GET_FLIGHT_BY_ID = 'GET_FLIGHT_BY_ID'

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const ADD_TO_CART = 'ADD_TO_CART'

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

export function getFlightInfo(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function getFlightByID(id) {
    return function (dispatch) {
        axios(`http://localhost:3001/flights`)
        .then((flight) => {
            dispatch({
                type: GET_FLIGHT_BY_ID, 
                payload: flight.data.filter(e => e.flight === id)
            })
        })
    }
}

// export const getFlightInfo = (search) => {
//     return async function (dispatch) {
//        fetch(`http://localhost:3001/flights/origen?origen=${search}`)
//        .then(r => r.json())
//        .then(data => dispatch({type: GET_FLIGHT_INFO, payload: data}));
//     }
// }

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

export const filterPrice = (payload) => {
    return {
        type: FILTER_PRICE,
        payload
    }
}

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

/////////
export function resetFilter(){
    return{
        type: RESET_FILTER
    }
}

export function filterByAirlines(payload){
    return{
        type: FILTER_BY_AIRLINES,
        payload
    }
}

export function cleanDetails(payload) {
    return {
        type: CLEAN,
        payload
    }
}

export function addToFavorite(payload) {
    return {
        type: ADD_FAVORITE, 
        payload
    }
}

export function deleteFavorite(payload) {
    return {
        type: DELETE_FAVORITE,
        payload
    }
}