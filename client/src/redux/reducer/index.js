import { 
GET_ALL_FLIGHTS,
FILTER_BY_PRICE,
GET_FLIGHT_INFO,
getAllFlights
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
        case GET_FLIGHT_INFO:
            return { ...state, flight: action.payload }
        case GET_USER_INFO:
            return { ...state, user: action.payload }
        case FILTER_BY_PRICE: 
            return { ...state, currrentFilter: [currrentFilter] }
    }
}

export default rootReducer;