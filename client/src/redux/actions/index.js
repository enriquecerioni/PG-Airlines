const axios = require("axios");
export const GET_ALL_FLIGHTS = "GET_ALL_FLIGHTS";
export const GET_ALL_AIRLINES = "GET_ALL_AIRLINES";
export const GET_ALL_SALES = "GET_ALL_SALES";
export const GET_AIRLINE_ID = "GET_AIRLINE_ID";
export const GET_FLIGHT_INFO = "GET_FLIGHT_INFO";
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USERS = "GET_USERS";
export const SEARCH_BY_DESTINATION = "SEARCH_BY_DESTINATION";
export const CLEAN = "CLEAN";
export const ORDER_PRICE = "ORDER_PRICE";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const ORDER_AVAILABILITY = 'ORDER_AVAILABILITY'
export const RESET_FILTER = "RESET_FILTER";
export const FILTER_PRICE = "FILTER_PRICE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_AIRLINES = "FILTER_BY_AIRLINES";
export const GET_FLIGHT_BY_ID = "GET_FLIGHT_BY_ID";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const CREATE_USER = "CREATE_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const ERROR_USER = "ERROR_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_FLIGHTS = "UPDATE_FLIGHTS";
export const CREATER_FLIGHTS = "CREATER_FLIGHTS";
export const DELETE_FLIGHTS = "DELETE_FLIGHTS";
export const DELETE_USER = "DELETE_USER";
export const CURRENT_USER = "CURRENT_USER";
export const CREATE_AIRLINE = "CREATE_AIRLINE";

export const CREATE_ORDER = "CREATE_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const RESET_PASSWORD = "RESET_PASSWORD"

export const GET_ALL_USER_FIREBASE = "GET_ALL_USER_FIREBASE";

export const getAllFlights = () => {
  return function (dispatch) {
    axios("http://localhost:3001/flights").then((flight) => {
      dispatch({
        type: GET_ALL_FLIGHTS,
        payload: flight.data,
      });
    });
  };
};

export const getAllAirlines = () => {
  return function (dispatch) {
    axios("http://localhost:3001/airlines").then((airline) => {
      dispatch({
        type: GET_ALL_AIRLINES,
        payload: airline.data,
      });
    });
  };
};

export function getFlightInfo(payload) {
  console.log("este es lo que recibeeeee",payload);
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
}

export function getFlightByID(id) {
  return function (dispatch) {
    axios(`http://localhost:3001/flights`).then((flight) => {
      dispatch({
        type: GET_FLIGHT_BY_ID,
        payload: flight.data.find((e) => e.id === id),
      });
    });
  };
}

export function getAllUsers() {
  return function (dispatch) {
    axios(`http://localhost:3001/user`)
      .then((res) => {
        dispatch({
          type: GET_USERS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log("Users not found");
      });
  };
}
export function getAllUsersFirebase() {
  return function (dispatch) {
    axios(`http://localhost:3001/user/firebase`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USER_FIREBASE,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log("Users not found");
      });
  };
}

export function getSales() {
  return function (dispatch) {
    axios(`http://localhost:3001/sales`)
      .then((res) => {
        dispatch({
          type: GET_ALL_SALES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log("Sales not found.");
      });
  };
}

export function getAirlineId(airlineId) {
  return {
    type: GET_AIRLINE_ID,
    payload: airlineId
  };
}

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export const orderAlphabetically = (payload) => {
  return {
    type: ORDER_ALPHABETICALLY,
    payload,
  };
};

export const orderByAvailability = (payload) => {
  return {
    type: ORDER_AVAILABILITY,
    payload,
  };
};

export const orderByPrice = (payload) => {
  return {
    type: ORDER_PRICE,
    payload,
  };
};

export const filterPrice = (payload) => {
  return {
    type: FILTER_PRICE,
    payload,
  };
};

/////////
export function resetFilter() {
  return {
    type: RESET_FILTER,
  };
}

export function filterByAirlines(payload) {
  return {
    type: FILTER_BY_AIRLINES,
    payload,
  };
}

export function cleanDetails(payload) {
  return {
    type: CLEAN,
    payload,
  };
}

export function deleteFromCart(payload) {
  return {
    type: DELETE_FROM_CART,
    payload,
  };
}

export function crearAerolinea(payload) {
  return function (dispatch) {
    axios.post("http://localhost:3001/airlines", payload).then((response) => {
      dispatch({
        type: CREATE_AIRLINE,
        payload: response.payload,
      });
    });
  };
}
export function deleteAirline(payload) {
  return function(dispatch) {
    axios
      .delete(`http://localhost:3001/airlines/delete/${payload}`)
      .then((res) => {
        console.log("se borro la empresa perro")
        dispatch({
          type: 'BORRAR',
          payload: res.data
        })

      })
      .catch(() => {
        console.log("no se pudo borrar");
      });
  }
}

export function createUser(payload) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/user/create", payload)
      .then((response) => {
        dispatch({
          type: CREATE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_USER,
          payload: "Usuario ya creado, login",
        });
      });
  };
}

export function currentUser(payload) {
  return {
    type: CURRENT_USER,
    payload,
  };
}

export function makeAdminPostgres(payload) {
  return function (dispatch) {
    axios.put("http://localhost:3001/user/update", payload)
    .then((response) => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    });
  };
}
export function deleteUser(payload) {
  return function (dispatch) {
    axios
      .delete(`http://localhost:3001/user/delete/${payload}`)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}
export function deleteUserAuth(payload) {
  return function () {
    axios
      .delete(`http://localhost:3001/user/auth/${payload}`)
      .then(() => {
        console.log("user auth firebase eliminated");
      })
      .catch(() => {
        console.log("error al borrar el auth user");
      });
  };
}

export function logOutUser(payload) {
  return {
    type: LOGOUT_USER,
    payload,
  };
}

export function addToFavorite(payload) {
  return {
    type: ADD_FAVORITE,
    payload,
  };
}

export function deleteFavorite(payload) {
  return {
    type: DELETE_FAVORITE,
    payload,
  };
}

///////
export function createOrder(payload) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/orders", payload)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER,
          payload: res,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getOrders() {
  return function (dispatch) {
    axios.get("http://localhost:3001/orders").then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    });
  };
}
/////////////
export function editToFlights(payload) {
  const flight = {
    flight: payload,
  };
  console.log(flight);
  //    debugger;
  return function (dispatch) {
    axios
      .put("http://localhost:3001/flights/update", flight)
      .then((response) => {
        dispatch({
          type: UPDATE_FLIGHTS,
          payload: response.data,
        });
      });
  };
}
export function deleteStockBack(payload) {
  const flightIdAmount = {
    flightIdAmount: payload,
  };
  return function (dispatch) {
      axios.put("http://localhost:3001/flights/stock", flightIdAmount)
      .then((res) => {
        console.log("todookey");
        dispatch({
          type: 'STOCKS',
          payload: res.data
        })
      })
      .catch((error) => {
        console.log(error.message);
      });    
  }
}

export function createFlights(payload) {
      const flight = {
         flight:payload
      };
  //console.log(payload);
  return function (dispatch) {
    axios
      .post("http://localhost:3001/flights/create", flight)
      .then((response) => {
        dispatch({
          type: CREATER_FLIGHTS,
          payload: response.data,
        });
      });
  };
}

export function deleteFlights(payload) {
  const flightIds = { flightIds: payload };
  //  debugger;
  //console.log(flightIds);
  return function (dispatch) {
    axios
      .post("http://localhost:3001/flights/delete", flightIds)
      .then((response) => {
        dispatch({
          type: DELETE_FLIGHTS,
          payload: response.data,
        });
      });
  };
}

export function getAllComments() {
  return function (dispatch) {
     axios
      .get("http://localhost:3001/comments")
      .then((res) => {
        dispatch({
          type: GET_COMMENTS,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function createComment(payload) {
  console.log("este es el payload papi",payload);
  return function (dispatch) {
    axios
      .post("http://localhost:3001/comments", payload)
      .then((res) => {
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function createSales(payload) {
  const sales = {
    sales: payload,
  }
  return function (dispatch) {
    axios
      .post("http://localhost:3001/sales", sales)
      .then((res) => {
        console.log("se creó la venta");
        dispatch({
          type: 'SALES',
          payload: res
        })
      })
      .catch((error) => {
        console.log(error.message);
      })  
  }

}

export function resetPassword(email) {
  return function(dispatch) {
      axios.post(`http://localhost:3001/user/resetPassword/${email}`)
      .then((res) => {
        console.log( "se reseteo la password")
        dispatch({
          type: 'RESET',
          payload: res
        })
      }
      ).catch((error) =>  {
        console.log(error)        
      })    
  }
}

export function updateReview(payload) {
  //console.log("esto es el payload de revie",payload)
  
  return function (dispatch) {
    axios.put(`http://localhost:3001/comments`, payload)
    .then(res => {
      console.log('todo tranqui')
      dispatch({
        type: 'UPDATE_REVIEW',
        payload: res.data
      })
    })
    .catch(error => console.log(error)) 
  }
}

export function verifyEmail(payload){
  return function(dispatch) {
    axios.put("http://localhost:3001/user/verificateEmail",payload)
    .then((res) => {
      console.log( "esta verificado pa")
      dispatch({
        type: 'verify',
        payload: res
      })
    }
    ).catch((error) =>  {
      console.log(error.message)        
    })    
}
}
export function disableUser(payload) {
  return function () {
    axios
      .put("http://localhost:3001/user/disableUser",payload)
      .then(() => {
        console.log("user auth firebase disable");
      })
      .catch(() => {
        console.log("error al banear el auth user");
      });
  };
}