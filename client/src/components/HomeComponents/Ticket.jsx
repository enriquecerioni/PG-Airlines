import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from '../styles/Ticket.module.css'
import { Link } from 'react-router-dom'
import { addToFavorite } from '../../redux/actions/index' 
import { CartContext } from '../CartComponents/CartContext'
import { useContext } from 'react'

function Ticket({id, origin, price, logo, airline, arrivalHour, departureHour, destination}) {

  const item = { id, origin, price, logo, airline, arrivalHour, departureHour }

  const {addProductToCart} = useContext(CartContext)

  const handleAddCart = (e) => {
    e.preventDefault()
    addProductToCart(item)
  }
  
    // function addFav(e) {
    //   e.preventDefault()

    //   if (!flightList.includes(e.target.value)) {
    //     dispatch(addToFavorite(item));
    //     console.log(`agregaste ${id} `)
    //   } else {
    //     console.log('ya agregado')
    //   }
    // }

  return (
    <div className={style.cards}>
        <li className={style.cards_item}>
        {/* <button onClick={addFav}>Favorite</button> */}

        <button className={style.btnCart} onClick={handleAddCart}>Add to cart</button>
        <div className={style.card}>
            <div className="card_image"><img src={logo} alt='#'/></div>
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