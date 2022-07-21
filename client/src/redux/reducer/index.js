import { 
GET_ALL_FLIGHTS,
ORDER_ALPHABETICALLY,
GET_FLIGHT_INFO,
ORDER_PRICE,
GET_USER_INFO,
RESET_FILTER,
FILTER_PRICE
} from "../actions"

const initialState = {
    flights: [], // todos los vuelos
    copy: [],
    currrentFilter: [],
    flight: {}, // vuelo con detalles
    user: {}, 
    ///////
    reset: true,
    orderState: 'initial'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_FLIGHTS: {
            return {
                ...state,
                flights: action.payload,
                copy: action.payload,
                currrentFilter: []
            }
        }

        case GET_FLIGHT_INFO:
            return { 
                ...state, 
                flight: action.payload 
            }

        case GET_USER_INFO:
            return { 
                ...state, 
                user: action.payload 
            }

        case ORDER_PRICE: {     
            let orderByPrice = action.payload === 'low' ? state.flights.sort((a, b) => {
             if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            else return 0; 
            }) : state.flights.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                else return 0;
            });

             return {
                 ...state, 
                 flights: orderByPrice,
                //  currrentFilter: orderByPrice,
                 orderState: action.payload
             }
        }

        case ORDER_ALPHABETICALLY: {
            let orderAlphabetically = action.payload === 'asc' || action.payload === 'initial' ? 
            state.flights.sort((a, b) => {
                if (a.airline > b.airline) return 1;
                if (a.airline < b.airline) return -1;
                else return 0; 
            }) : 
            state.flights.sort((a, b) => {
                if (a.airline > b.airline) return -1;
                if (a.airline < b.airline) return 1;
                else return 0; 
            })

            return {
                ...state, 
                flights: orderAlphabetically,
                orderState: action.payload
            }
        }

        case RESET_FILTER: {
            return {
                ...state,
                reset: !state.reset,
                orderState: 'initial'
            }
        }

       case FILTER_PRICE: {
        let arrPrice = state.copy;

        let filterPrice = action.payload === '>20.000' ?
        arrPrice.filter(e => e.price < 20000)
        : action.payload === 'between' ?
        arrPrice.filter(e => 20000 <= e.price < 40000)
        : action.payload === '<40.000' ?
        arrPrice.filter(e => 40000 >=  e.price)
        : arrPrice

        return {
            ...state,
            // flights: action.payload === 'all' ? arrPrice : filterPrice
            currrentFilter: action.payload === 'all' ? arrPrice : filterPrice
        }
       }

        default: 
            return state;
    }
}

export default rootReducer;