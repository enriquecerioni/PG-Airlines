import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/Ticket.module.css'
import { Link } from 'react-router-dom'
import { addToFavorite } from '../redux/actions/index'

function Ticket({airline, id, logo, departureHour, arrivalHour, price, origin, destination}) {
    const source = 'https://media.istockphoto.com/vectors/airplane-fly-out-logo-plane-taking-off-stylized-sign-vector-id1137971264?k=20&m=1137971264&s=612x612&w=0&h=_Mds3bkTPPoIBHsa9orqQCW6gO7dka96d3BJvdh7sHg='
    // console.log(flight)

    const dispatch = useDispatch()

    const flightList = useSelector(state => state.favoriteList)
    const item = {airline, id, logo, departureHour, arrivalHour, price, origin, destination}
  
    function addFav(e) {
      e.preventDefault()
      if (!flightList.includes(item.id)) {
        dispatch(addToFavorite(item));
        console.log(`agregaste ${id} `)
      } else {
        console.log('ya agregado')
      }
    }

  return (
    <div className={style.cards} key={id} >
        <li className={style.cards_item}>
        <button onClick={addFav}>Favorite</button> 
        <div className={style.card}>
            <div className="card_image"><img src={logo} width='100px' height='100px'/></div>
            <div className={style.card_content}>
            <h2 className={style.card_title}>{airline}</h2>
            <h5>Origin: {origin} | Destination: {destination} </h5>
            <p className="card_text">{departureHour} / {arrivalHour}</p>
            </div>
            <div>
            <p className={style.card_text}>${price} | price | price</p>
            <Link to={`/ticket/${id}`} >
              <button className={style.btn}>View Deal</button> 
            </Link>
            </div>
        </div>
        </li>
    </div>
  )
}

export default Ticket