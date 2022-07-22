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
  CLEAN
} from "../actions";

const initialState = {
  flights: [], // todos los vuelos
  copy: [],
  currrentFilter: [],
  flight: [], // vuelo con detalles
  user: {},
  filterPrecioData: '',
  filterAirlinesData: '',
  ///////
  reset: true,
  orderState: "initial",
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

    case FILTER_BY_ORIGIN: {
      const searchFlight = state.flights.filter((e) =>
        e.origin.toLowerCase().includes(action.payload.toLowerCase())
      );
      if (searchFlight.length > 0) {
        return {
          ...state,
          flights: searchFlight,
        };
      } else {
        alert("Origin Not Found");
        return {
          ...state,
          flights: state.copy,
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
        state.currrentFilter.length && (action.payload === "asc" || action.payload === "initial")
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
        action.payload === ">20.000"
          ? arrPrice.filter((e) => e.price < 20000)
          : action.payload === "between"
            ? arrPrice.filter((e) => {
              if (e.price >= 20000 && e.price <= 40000)
                return e.price
            })
            : action.payload === "<40.000"
              ? arrPrice.filter((e) => 40000 <= e.price)
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
        flight: []
      }
    }

    default:
      return state;
  }
};

export default rootReducer;
