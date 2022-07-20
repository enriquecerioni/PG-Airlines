import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import style from '../components/styles/Display.module.css'
import Paginate from './Paginate'
import Filter from './Filter'
import {getAllFlights} from '../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux';

function Display() {
// console.log(details)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllFlights())
    }, [dispatch])
    // PAGINATE
    const details = useSelector((state) => state.flights)
    console.log(details)
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage, /*setCardPerPage*/] = useState(3)

    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const paginateCards = details.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
        <div className={style.container_ticket}>
            <div className={style.ticket_container} >
                {paginateCards
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
                <Filter />
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

export default Display