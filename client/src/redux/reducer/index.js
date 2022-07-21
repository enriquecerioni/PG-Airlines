import {
    GET_ALL_FLIGHTS,
    FILTER_ALPHABETICALLY,
    GET_FLIGHT_INFO,
    ORDER_PRICE,
    GET_USER_INFO,
    filterByAirlines
    // getAllFlights
} from "../actions"

const initialState = {
    flights: [],
    currrentFilter: [],
    flight: {},
    user: {},
    copyFlights: []


}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_FLIGHTS: {
            state.copyFlights = action.payload
            return {
                ...state,
                flights: action.payload

            }
        }


        case GET_FLIGHT_INFO:
            return { ...state, flight: action.payload }

        case GET_USER_INFO:
            return { ...state, user: action.payload }

        // case ORDER_PRICE: {
        //     let orderByPrice = action.payload === 'high' ? state.flights.sort((a, b) => {
        //      if (a.price > b.price) return 1;
        //     if (a.price < b.price) return -1;
        //     else return 0; 
        // }) : state.flights.sort((a, b) => {
        //     if (a.price > b.price) return -1;
        //     if (a.price < b.price) return 1;
        //     else return 0;
        // });
        //      return {
        //          ...state, 
        //          flights: orderByPrice 
        //      }
        // }
        // case ORDER_ALPHABETICALLY: {
        //     let orderAlphabetically = action.payload === 'asc' ? 
        //     state.flights.sort((a, b) => {
        //         if (a.airline > b.airline) return 1;
        //         if (a.airline < b.airline) return -1;
        //         else return 0; 
        //     }) : state.flights.sort((a, b) => {
        //         if (a.airline > b.airline) return -1;
        //         if (a.airline < b.airline) return 1;
        //         else return 0; 
        //     })

        //     return {
        //         ...state, 
        //         flights: orderAlphabetically
        //     }
        // }

        /* 
        case FILTER_AIRLINE: {

            return {
                ...state,
                flights: 
            }
        }
        /

       /
       case FILTER_SEATS: {

        return {
            ...state,
            flights:
        }
       }
       */
        case 'FILTER_BY_AIRLINES':
            const airlines = action.payload;
            const copyFlights = state.copyFlights;
            const filterAirlines = copyFlights.filter(f => f.airline.toLowerCase().includes(airlines.toLowerCase()));
            return {
                ...state,
                flights: filterAirlines
            }


        default:
            return state;
    }
}

export default rootReducer;