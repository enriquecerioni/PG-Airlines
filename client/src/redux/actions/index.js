const axios = require ("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS"
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO"
export const GET_USER_INFO = "GET_USER_INFO"
export const GET_USERS = 'GET_USERS'
export const SEARCH_BY_DESTINATION = 'SEARCH_BY_DESTINATION'
export const CLEAN = 'CLEAN'
export const ORDER_PRICE = 'ORDER_PRICE'
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const RESET_FILTER = 'RESET_FILTER'
export const FILTER_PRICE = 'FILTER_PRICE'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const FILTER_BY_AIRLINES = 'FILTER_BY_AIRLINES'
export const GET_FLIGHT_BY_ID = 'GET_FLIGHT_BY_ID'
export const ADD_CART = 'ADD_CART'
export const RESET_CART = 'RESET_CART'
export const CREATE_USER='CREATE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const ERROR_USER = 'ERROR_USER'
export const UPDATE_USER="UPDATE_USER"
export const UPDATE_FLIGHTS="UPDATE_FLIGHTS"
export const CREATER_FLIGHTS="CREATER_FLIGHTS"

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

export function getAllUsers(){
    return function (dispatch) {
        axios(`http://localhost:3001/user`)
        .then((res) => {
            dispatch({
                type: GET_USERS, 
                payload: res.data
            })
        })
        .catch((error) => {
            console.log("Users not found");
        }) 
    }
}

export function addToCart(payload){
    return{
        type: ADD_TO_CART,
        payload
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

export const filterPrice = (payload) => {
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

export function deleteFromCart(payload) {
    return {
        type: DELETE_FROM_CART,
        payload
    }
}    

export function createUser(payload){
    return function (dispatch){
        axios.post('http://localhost:3001/user/create',payload)
        .then((response)=>{
            dispatch({
                type:CREATE_USER,
                payload:response.data
            })
        })
        .catch((error)=>{
            dispatch({
                type: ERROR_USER,
                payload: 'Usuario ya creado, login'
            })
        })
    }
}
export function makeAdminPostgres(payload){
    return function (dispatch){
        axios.put('http://localhost:3001/user/update',payload)
        .then((response)=>{
            dispatch({
                type:UPDATE_USER,
                payload:response.data
            })
        })
    }
}
export function logOutUser(payload) {
    return {
        type: LOGOUT_USER,
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

export function editToFlights(payload){
   const flight = {
      flight:payload
   }; 
   console.log(flight);
   debugger;
    return function (dispatch){
        axios.post('http://localhost:3001/flights/update',flight)
        .then((response)=>{
            dispatch({
                type:UPDATE_FLIGHTS,
                payload:response.data
            })
        })
    }
}

export function createrToFlights(payload){
    const flight = {
       flight:payload
    }; 
    console.log(flight);
    debugger;
     return function (dispatch){
         axios.post('http://localhost:3001/flights/creater',flight)
         .then((response)=>{
             dispatch({
                 type:CREATER_FLIGHTS,
                 payload:response.data
             })
         })
     }
 }