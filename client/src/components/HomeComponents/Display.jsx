import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Ticket from './Ticket'
import style from '../styles/Display.module.css'
import Paginate from './Paginate';
import Filter from '../Filter'
// import Filter from './Filter'
import { getAllFlights, orderByPrice, orderAlphabetically, filterPrice, filterByAirlines} from '../../redux/actions/index'

export default function Display() {
// console.log(details)
    const dispatch = useDispatch()

    const details = useSelector((state) => state.flights)
    // console.log(details)
    const filterArray = useSelector(s => s.currrentFilter)
    const orderState = useSelector(state => state.orderState)

    const orderPriceSelect = useRef('')
    const orderAlpSelect = useRef('')

    useEffect(() => {
        // if(filterArray.length !== 0) return filterArray
        // else 
        dispatch(getAllFlights())
        setTimeout(() => {
            dispatch(filterPrice('all'));
        }, 1000)

        orderPriceSelect.current.value = orderState
        orderAlpSelect.current.value = orderState        
    }, [])

    // PAGINATE
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage, /*setCardPerPage*/] = useState(6)

    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const paginateCards = filterArray.length ? filterArray.slice(indexOfFirstCard, indexOfLastCard) :
    details.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    function handleClick(e) {
        e.preventDefault();
         dispatch(filterByAirlines(e.target.value));
        document.getElementById('search').value = e.target.value;
        setAirlines([]);
    }

    function handleSearchAirlines(e) {
        e.preventDefault();      
        const allAirlines = filterArray.map(f => f.airline);
        let airlines = allAirlines.filter((v, i) => {
            return allAirlines.indexOf(v) === i;
        })
        if (e.target.value !== '') {
            airlines = airlines.filter(f => f.toLowerCase().includes(e.target.value.toLowerCase()));
            setAirlines(airlines);
        } else {
               dispatch(filterByAirlines('all'));
               setAirlines([]);
        }
    }

  return (
    <div>
        <div className={style.container_ticket}>
            <div className={style.ticket_container} >
                
                { 
                filterArray.length !== 0 ? 
                paginateCards.map(e => {
                    return (<Ticket 
                        key={e.flight}
                        id={e.flight}
                        airline={e.airline}
                        logo={e.logo}
                        price={e.price}
                        departureHour={e.departureHour}
                        arrivalHour={e.arrivalHour}
                        origin={e.origin}
                        destination={e.destination}                        
                    />) 
                           
                }) :
                <p>Vuelos no encontrados, te invitamos a volver a buscar!</p>
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
                handleSearchAirlines={handleSearchAirlines}
                airlinesData={airlinesData}
                />

            </div>
        </div>   

        <Paginate
            cardPerPage={cardPerPage}
            paginate={paginate}
            total={ filterArray.length ? filterArray.length
                : details.length}
        />     
    </div>
  )
}