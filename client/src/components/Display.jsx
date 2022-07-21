import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Ticket from './Ticket'
import style from '../components/styles/Display.module.css'
import Paginate from './Paginate'
import Filter from './Filter'

import { getAllFlights, orderByPrice, orderAlphabetically, filterPrice} from '../redux/actions/index'

export default function Display() {
// console.log(details)
    const dispatch = useDispatch()

    const details = useSelector((state) => state.flights)
    const filterArray = useSelector(s => s.currrentFilter)

    useEffect(() => {
        dispatch(getAllFlights())
    }, [])

    const orderState = useSelector(state => state.orderState)
    const reset = useSelector(state => state.reset)

    const orderPriceSelect = useRef('')
    const orderAlpSelect = useRef('')

    useEffect(() => {
        orderPriceSelect.current.value = orderState
        orderAlpSelect.current.value = orderState
    }, [])

    // PAGINATE
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage, /*setCardPerPage*/] = useState(6)

    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const paginateCards = details.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // FILTER AND ORDER
    function handleAlph(e) {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        paginate(1)
    }

    function handlePrice(e) {
        e.preventDefault()
        dispatch(orderByPrice(e.target.value))
        paginate(1)
    }   

    function handleFilterPrice(e) {
        e.preventDefault()
        dispatch(filterPrice(e.target.value))
        paginate(1)
    }

    // function handleReset(e) {
    //     e.preventDefault()
    //     dispatch(resetFilter())
    //     dispatch(orderByPrice('initial'))
    // }

  return (
    <div>
        <div className={style.container_ticket}>
            <div className={style.ticket_container} >
                { 
                filterArray.length !== 0 ? 
                filterArray.map(e => {
                    return (<Ticket 
                        key={e.flight}
                        id={e.flight}
                        airline={e.airline}
                        logo={e.logo}
                        price={e.price}
                        departureHour={e.departureHour}
                        arrivalHour={e.arrivalHour}
                    />)        
                }) :

                paginateCards
                .map(e => {
                    return (<Ticket 
                        key={e.flight}
                        id={e.flight}
                        airline={e.airline}
                        logo={e.logo}
                        price={e.price}
                        departureHour={e.departureHour}
                        arrivalHour={e.arrivalHour}
                    />)        
                })}  
                           
            </div>
            <div className={style.filter_container}>
                
                <Filter
                handlePrice={handlePrice}
                handleAlph={handleAlph} 
                orderPriceSelect={orderPriceSelect}
                orderAlpSelect={orderAlpSelect}
                handleFilterPrice={handleFilterPrice}
                />
            </div>
        </div>   

        <Paginate
            cardPerPage={cardPerPage}
            paginate={paginate}
            total={details.length}
        />     
    </div>
  )
}