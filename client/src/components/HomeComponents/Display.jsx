import React, { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Ticket from './Ticket'
import style from '../styles/Display.module.css'
import Paginate from './Paginate';
import Filter from '../Filter';
import { getAllFlights, orderByPrice, orderAlphabetically, filterPrice, filterByAirlines, getAllUsers, currentUser, getAllAirlines} from '../../redux/actions/index'
import { darkModeContext } from "../DarkModeContext";

export default function Display() {

    const { darkMode } = useContext(darkModeContext)

    const dispatch = useDispatch()
    const airlinesState=useSelector(state=>state.airlines)
    //console.log("airlinesss",airlines);
    // const [price, setPrice] = React.useState('');

    const details = useSelector((state) => state.flights)
    // console.log(details)
    const filterArray = useSelector(s => s.currrentFilter)
    const orderState = useSelector(state => state.orderState)

    const orderPriceSelect = useRef('')
    const orderAlpSelect = useRef('')

    useEffect(() => {
        // if(filterArray.length !== 0) return filterArray
        // else 
        //dispatch(getAllUsers());
        dispatch(getAllAirlines())
        dispatch(getAllFlights())
        setTimeout(() => {
            dispatch(filterPrice('all'));
        }, 1000)

        orderPriceSelect.current.value = orderState
        orderAlpSelect.current.value = orderState        
    }, [dispatch, /*orderState*/])

    // PAGINATE
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage, /*setCardPerPage*/] = useState(6)
    const [isActive, setIsActive] = useState(false);

    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const paginateCards = filterArray.length ? filterArray.slice(indexOfFirstCard, indexOfLastCard) :
    details.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => { 
        setIsActive(true)
        setCurrentPage(pageNumber)
    };

    // FILTER AND ORDER

    let [airlinesData, setAirlines] = useState([]);
     
     
    function handleAlph(e) {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
    }

    function handlePrice(e) {
         e.preventDefault()
        dispatch(orderByPrice(e.target.value))
        setCurrentPage(1)
    }   

    function handleFilterPrice(e) {
        e.preventDefault()
       // dispatch(filterPrice(e.target.value))
        setCurrentPage(1)
        switch (e.target.value) {
            case 10:
                dispatch(filterPrice(">20.000"));
                break;
            case 45:
                dispatch(filterPrice("between"));
                break;
            case 80:
                dispatch(filterPrice("<40.000"));
                break;
            case 100:
                dispatch(filterPrice('all'));
                break;
            default:
                break
        }
    }

    function handleClick(value){
        if(value == undefined){
         dispatch(filterByAirlines("all"));
         return
        }
         const data = airlinesState.find(f=> f.name == value);
         dispatch(filterByAirlines(data.id));
     }



  return (
    <div>
        <div className={style.container_ticket}>
            <div className={style.ticket_container} >
                
                { 
                filterArray.length !== 0 ? 
                paginateCards.map(e => {
                    //console.log(e);
                    if(e.tickets){return (<Ticket 
                        key={e.id}
                        id={e.id}
                        airlineId={e.airlineId}
                        // airline={e.airline}
                        logo={e.logo}
                        price={e.price}
                        departureHour={e.departureHour}
                        arrivalHour={e.arrivalHour}
                        origin={e.origin}
                        destination={e.destination}
                        tickets={e.tickets}              
                    />) }
                           
                }) :
                <p>Flights not found, search again please!</p>
                // paginateCards
                // .map(e => {
                //     return (<Ticket 
                //         key={e.flight}
                //         id={e.flight}
                //         airline={e.airline}
                //         logo={e.logo}
                //         price={e.price}
                //         departureHour={e.departureHour}
                //         arrivalHour={e.arrivalHour}
                //         origin={e.origin}
                //         destination={e.destination}
                //     />)        
                // })
            }  
            </div>
                           
            <div className={style.filter_container}>
                
                <Filter
                handlePrice={handlePrice}
                handleAlph={handleAlph} 
                orderPriceSelect={orderPriceSelect}
                orderAlpSelect={orderAlpSelect}
                handleFilterPrice={handleFilterPrice}
                handleClick={handleClick}
              //  handleSearchAirlines={handleSearchAirlines}
                airlinesData={airlinesState}
                />

            </div>
        </div>   

        <Paginate
            cardPerPage={cardPerPage}
            currentPage={currentPage}
            paginate={paginate}
            total={ filterArray.length ? filterArray.length
                : details.length}
            isActive={isActive}    
        />     
    </div>
  )
}