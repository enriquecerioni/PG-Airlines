import {
  GET_ALL_FLIGHTS,
  ORDER_ALPHABETICALLY,
  GET_FLIGHT_INFO,
  ORDER_PRICE,
  GET_USER_INFO,
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
  RESET_CART,
  CREATE_USER
} from "../actions";

const initialState = {
  flights: [], // todos los vuelos
  cart: [],
  copy: [],
  currrentFilter: [],
  flight: [], // vuelo con detalles
  user: {},
  allUsers:[],
  reset: true,
  orderState: "initial",
  favoriteList: [],
  shoppingCart: [],
  filterPrecioData: '',
  filterAirlinesData: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FLIGHTS: {
      return {
        ...state,
        flights: action.payload,
        copy: action.payload,
        currrentFilter: [],
      };
    }

    case GET_FLIGHT_BY_ID: {
      return {
        ...state,
        flight: action.payload
      }
      };

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
    case CREATE_USER:
      return{
        ...state,
        allUsers:[...state.allUsers,action.payload]
      }
    case ADD_CART: 
      let tempcart = state.cart.filter((item) => item.id === action.payload);
      console.log(tempcart)

      if (tempcart < 1) {
        let pushToCart = [...state.cart]
        pushToCart.push(action.payload) 
        console.log(state.cart)
        return {
          ...state, 
          cart: pushToCart};
      } else {
        return state.cart;
      }

    
    case FILTER_BY_ORIGIN: {  
      const searchFlightByOrigin = state.flights.filter((e) =>
        e.origin.toLowerCase()===(action.payload.origin.toLowerCase() )
      );
      const originAndDest = searchFlightByOrigin.filter((e) =>
        e.destination.toLowerCase().includes(action.payload.destination.toLowerCase())
      );
      const searchFlightByDestination = state.flights.filter((e) =>
      e.destination.toLowerCase().includes(action.payload.destination.toLowerCase())
      )

      console.log(state.flights.map(e => e.origin.toLowerCase()/**.includes(action.payload.origin.toLowerCase()) */ ), action.payload)

      console.log(searchFlightByOrigin)
      console.log(originAndDest)
      console.log(searchFlightByDestination)

      if(originAndDest.length) {
        return {
          ...state,
          currrentFilter: originAndDest,
        };
      }
      else if (searchFlightByOrigin.length || searchFlightByDestination.length ) {
        return {
          ...state,
          currrentFilter: [...searchFlightByOrigin, ...searchFlightByDestination],
        };
      } else {
        alert("Origin Not Found");
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
      let orderAlphabetically =
        action.payload === "asc" || action.payload === "initial"
          ? state.flights.sort((a, b) => {
            if (a.airline > b.airline) return 1;
            if (a.airline < b.airline) return -1;
            else return 0;
          })
          : state.flights.sort((a, b) => {
            if (a.airline > b.airline) return -1;
            if (a.airline < b.airline) return 1;
            else return 0;
          });

      let orderFiltered =
        state.currrentFilter.length &&
        (action.payload === "asc" || action.payload === "initial")
          ? state.currrentFilter.sort((a, b) => {
              if (a.airline > b.airline) return 1;
              if (a.airline < b.airline) return -1;
              else return 0;
            })
          : state.currrentFilter.sort((a, b) => {
              if (a.airline > b.airline) return -1;
              if (a.airline < b.airline) return 1;
              else return 0;
            });

      return {
        ...state,
        flights: orderAlphabetically,
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
        action.payload === ">20.000" ? arrPrice.filter((e) => e.price <= 20000)
        : action.payload === "between"
        ? arrPrice.filter((e) => {
          if (e.price >= 20000 && e.price <= 40000)
            return e.price
        })
          : action.payload === "<40.000" ? arrPrice.filter((e) => 40000 <= e.price)
          : arrPrice;
          if (state.filterAirlinesData != '' && state.filterAirlinesData != 'all') {
            filterPrice = filterPrice.filter(f => f.airline.toLowerCase().includes(state.filterAirlinesData.toLowerCase()));
          }
          state.filterPrecioData = action.payload;
    
          return {
            ...state,
            // flights: action.payload === 'all' ? arrPrice : filterPrice
            currrentFilter: filterPrice
      };
    }

    case FILTER_BY_AIRLINES:
      let copyFlights = state.copy;
      const filterData = state.filterPrecioData;

      if (action.payload != 'all')
        copyFlights = copyFlights.filter(f => f.airline.toLowerCase().includes(action.payload.toLowerCase()));

      if (filterData != '' && filterData != 'all') {
        copyFlights =
          filterData === ">20.000"
            ? copyFlights.filter((e) => e.price < 20000)
            : filterData === "between"
              ? copyFlights.filter((e) => {
                if (e.price >= 20000 && e.price <= 40000)
                  return e.price
              })
              : filterData === "<40.000"
                ? copyFlights.filter((e) => 40000 <= e.price)
                : copyFlights;
      }
      state.filterAirlinesData = action.payload;
      return {
        ...state,
        currrentFilter: copyFlights
        //flights : filterAirlines
      }

    case CLEAN: {
      return {
        ...state,
        flight: [],
      };
    }

    case ADD_TO_CART: {
        
      return {
        ...state,
        shoppingCart : [...state.shoppingCart,action.payload]
      }
    }

    case DELETE_FROM_CART: 
    // console.log(action.payload)
    // console.log(state.shoppingCart)
    let newArray = state.shoppingCart.filter((flight)=>flight.id !== action.payload)
    // console.log(newArray)
    return{
     ...state,
      shoppingCart:newArray
    }

    case ADD_FAVORITE: {

      return {
        ...state,
        favoriteList: [action.payload, ...state.favoriteList]
      }
    }

    case DELETE_FAVORITE: {
      let newArray = state.favoriteList.filter((item)=> item.id !== action.payload)

      return {
        ...state,
        favoriteList : newArray
      }
    }

    default:
      return state;
  }
};

export default rootReducer;