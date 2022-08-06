import {
  GET_ALL_FLIGHTS,
  GET_ALL_AIRLINES,
  ORDER_ALPHABETICALLY,
  GET_FLIGHT_INFO,
  ORDER_PRICE,
  GET_USER_INFO,
  GET_USERS,
  RESET_FILTER,
  FILTER_PRICE,
  FILTER_BY_ORIGIN,
  FILTER_BY_AIRLINES,
  GET_FLIGHT_BY_ID,
  CLEAN,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ADD_TO_CART,
  DELETE_FROM_CART,
  ADD_CART,
  // RESET_CART,
  CREATE_USER,
  LOGOUT_USER,
  ERROR_USER,
  UPDATE_USER,
  UPDATE_FLIGHTS,
  CREATER_FLIGHTS,
  DELETE_FLIGHTS,
  DELETE_USER,
  CURRENT_USER,
  GET_ORDERS,
  GET_COMMENTS,
  GET_ALL_USER_FIREBASE,
} from "../actions";
import Swal from 'sweetalert2'

const initialState = {
  flights: [], // todos los vuelos
  airlines: [], // todas las aerolineas
  cart: [],
  copy: [],
  currrentFilter: [],
  flight: [], // vuelo con detalles
  user: {},
  allUsers: [],
  allUsersFirebase: [],
  orders: [],
  currentUser: [],
  reset: true,
  orderState: "initial",
  favoriteList: [],
  shoppingCart: [],
  filterPrecioData: '',
  filterAirlinesData: '',
  error: '',
  comments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FLIGHTS: {
      // console.log("que es action.payload",action.payload)
      return {
        ...state,
        flights: action.payload,
        copy: action.payload,
        currrentFilter: [],
      };
    }

    case GET_ALL_AIRLINES: {
      // console.log("que es action.payload",action.payload)
      return {
        ...state,
        airlines: action.payload,

      };
    }

    case GET_FLIGHT_BY_ID: {
      return {
        ...state,
        flight: action.payload,
      };
    }

    case GET_FLIGHT_INFO:
      return {
        ...state,
        flight: action.payload,
      };

    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    case GET_ALL_USER_FIREBASE:
      return {
        ...state,
        allUsersFirebase: action.payload,
      }
    case CREATE_USER:
      return {
        ...state,
        error: "",
        allUsers: [...state.allUsers, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.email === action.payload ? { ...user, permissions: true } : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(
          (user) => user.email !== action.payload
        ),
      };

    case CURRENT_USER:
      let arr = state.allUsers.filter((user) => user.email === action.payload);
      console.log(arr);
      return {
        ...state,
        currentUser: arr,
      };
    case LOGOUT_USER: {
      return {
        ...state,
        allUsers: [],
      };
    }

    case ADD_CART:
      let tempcart = state.cart.filter((item) => item.id === action.payload);
      //console.log(tempcart)

      if (tempcart < 1) {
        let pushToCart = [...state.cart];
        pushToCart.push(action.payload);
        //console.log(state.cart)
        return {
          ...state,
          cart: pushToCart,
        };
      } else {
        return state.cart;
      }

    case FILTER_BY_ORIGIN: {
      const searchFlightByOrigin = state.flights.filter((e) =>
        e.origin.toLowerCase().includes(action.payload.origin.toLowerCase())
      );
      // console.log(searchFlight)
      const originAndDest = searchFlightByOrigin.filter((e) =>
        e.destination
          .toLowerCase()
          .includes(action.payload.destination.toLowerCase())
      );
      const searchFlightByDestination = state.flights.filter((e) =>
        e.destination
          .toLowerCase()
          .includes(action.payload.destination.toLowerCase())
      );

      console.log(
        state.flights.map(
          (e) =>
            e.origin.toLowerCase() /**.includes(action.payload.origin.toLowerCase()) */
        ),
        action.payload
      );

      console.log(searchFlightByOrigin);
      console.log(originAndDest);
      console.log(searchFlightByDestination);

      if (originAndDest.length) {
        return {
          ...state,
          currrentFilter: originAndDest,
        };
      } else if (
        searchFlightByOrigin.length ||
        searchFlightByDestination.length
      ) {
        return {
          ...state,
          currrentFilter: [
            ...searchFlightByOrigin,
            ...searchFlightByDestination,
          ],
        };
      } else {
        Swal.fire({
          icon: 'error',
          title: 'opps...',
          text: 'Origin not found'
        })
        return {
          ...state,
          currrentFilter: state.copy,
        };
      }
    }

    case ORDER_PRICE: {
      let orderByPrice =
        action.payload === "low"
          ? state.flights.sort((a, b) => {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            else return 0;
          })
          : state.flights.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            else return 0;
          });

      let orderFiltered =
        state.currrentFilter.length && action.payload === "low"
          ? state.currrentFilter.sort((a, b) => {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            else return 0;
          })
          : state.currrentFilter.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            else return 0;
          });

      return {
        ...state,
        flights: orderByPrice,
        currrentFilter: orderFiltered,
        orderState: action.payload,
      };
    }

    case ORDER_ALPHABETICALLY: {
      let data = getNameAirlines(state.currrentFilter, state.airlines);

      state.currrentFilter = data;
      data = getNameAirlines(state.copy, state.airlines);
      state.copy = data;
      let orderAlphabetically =
        action.payload === "asc" || action.payload === "initial"
          ? state.copy.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            else return 0;
          })
          : state.copy.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            else return 0;
          });

      let orderFiltered =
        state.currrentFilter.length &&
          (action.payload === "asc" || action.payload === "initial")
          ? state.currrentFilter.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            else return 0;
          })
          : state.currrentFilter.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            else return 0;
          });

      return {
        ...state,
        flights: orderFiltered,
        currrentFilter: orderFiltered,
        orderState: action.payload,
      };
    }

    case RESET_FILTER: {
      return {
        ...state,
        reset: !state.reset,
        orderState: "initial",
      };
    }

    case FILTER_PRICE: {
      let arrPrice = state.copy;

      let filterPrice =
        action.payload === ">20.000"
          ? arrPrice.filter((e) => e.price <= 20000)
          : action.payload === "between"
            ? arrPrice.filter((e) => {
              if (e.price >= 20000 && e.price <= 40000) return e.price;
            })
            : action.payload === "<40.000"
              ? arrPrice.filter((e) => 40000 <= e.price)
              : arrPrice;
      if (state.filterAirlinesData !== "" && state.filterAirlinesData !== "all") {
        filterPrice = filterPrice.filter((f) =>
          f.airlineId == state.filterAirlinesData
        );
      }
      state.filterPrecioData = action.payload;

      return {
        ...state,
        // flights: action.payload === 'all' ? arrPrice : filterPrice
        currrentFilter: filterPrice,
      };
    }

    case FILTER_BY_AIRLINES:
      let copyFlights = state.copy;
      const filterData = state.filterPrecioData;
      if (action.payload !== "all")
        copyFlights = copyFlights.filter((f) =>
          f.airlineId == action.payload);

      if (filterData !== "" && filterData !== "all") {
        copyFlights =
          filterData === ">20.000"
            ? copyFlights.filter((e) => e.price < 20000)
            : filterData === "between"
              ? copyFlights.filter((e) => {
                if (e.price >= 20000 && e.price <= 40000) return e.price;
              })
              : filterData === "<40.000"
                ? copyFlights.filter((e) => 40000 <= e.price)
                : copyFlights;
      }
      state.filterAirlinesData = action.payload;
      return {
        ...state,
        currrentFilter: copyFlights,
        //flights : filterAirlines
      };

    case CLEAN: {
      return {
        ...state,
        flight: [],
      };
    }

    case ADD_TO_CART: {
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      };
    }

    case DELETE_FROM_CART:
      // console.log(action.payload)
      // console.log(state.shoppingCart)
      let newArray = state.shoppingCart.filter(
        (flight) => flight.id !== action.payload
      );
      // console.log(newArray)
      return {
        ...state,
        shoppingCart: newArray,
      };

    case ADD_FAVORITE: {
      return {
        ...state,
        favoriteList: [action.payload, ...state.favoriteList],
      };
    }

    case DELETE_FAVORITE: {
      let newArray = state.favoriteList.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        favoriteList: newArray,
      };
    }

    case ERROR_USER: {
      return {
        ...state,
        allUsers: [],
        error: action.payload,
      };
    }
    case UPDATE_FLIGHTS: {
      let allflight = [];
      if (!action.payload === "404") {
        allflight = state.allflight;
      }

      return {
        ...state,
        flights: allflight,
      };
    }

    case CREATER_FLIGHTS: {
      let allflight = [];
      if (!action.payload === "404") {
        allflight = state.allflight;
      }
      return {
        ...state,
        flights: state.allflight,
      };
    }

    case DELETE_FLIGHTS: {
      let allflight = [];
      return {
        ...state,
        flights: allflight,
      };
    }

    case GET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }

    case GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      }
    }


    default:
      return state;
  }
};


function getNameAirlines(obj, state) {
  const data = obj.map(m => {
    const nameObj = state.find(a => {
      if (a.id == m.airlineId)
        return (a.name);
    });
    return (
      {
        airlineId: m.airlineId,
        name: nameObj.name,
        arrivalDate: m.arrivalDate,
        arrivalHour: m.arrivalHour,
        departureDate: m.departureDate,
        departureHour: m.departureHour,
        destination: m.destination,
        durationEstimated: m.durationEstimated,
        id: m.id,
        logo: m.logo,
        origin: m.origin,
        price: m.price,
        tickets: m.tickets
      }
    );
  });
  return data;
}

export default rootReducer;
