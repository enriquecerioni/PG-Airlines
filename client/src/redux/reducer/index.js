import { 
GET_ALL_FLIGHTS,
FILTER_ALPHABETICALLY,
GET_FLIGHT_INFO,
ORDER_PRICE,
// getAllFlights
} from "../actions"

const initialState = {
    flights: [],
    currrentFilter: [],
    flight: {},
    user: {}
    

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FLIGHTS: 
        if (currrentFilter.length === 0) {
            return { ...state, flights: action.payload }
        } else {
            return { ...state, flights: [currrentFilter] }
        }

        case FILTER_ALPHABETICALLY: 
            return { ...state, currrentFilter: [currrentFilter] }

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

        default: 
            return state;    
    }
}

export default rootReducer;