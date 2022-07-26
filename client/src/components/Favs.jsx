import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import s from './styles/Favs.module.css'
import style from './styles/Ticket.module.css'
import { Link } from 'react-router-dom';
import { deleteFavorite } from '../redux/actions/index'

function Favs() {

  const dispatch = useDispatch()

  const flightList = useSelector(state => state.favoriteList)
  // console.log(flightList)

  // funciona
  function removeFavorite(id) {
    // console.log(id)
    dispatch(deleteFavorite(id))
  }  

  return (
    <div className={s.favs_containers}>
        {flightList.length ? 
        flightList.map(c => {
          return (<div className={style.cards} key={c.id}>
            <li className={style.cards_item}>
            <div className={style.card}>
                <div className="card_image"><img src={c.logo} alt='#' width='100px' height='100px'/></div>
                <div className={style.card_content}>
                <h2 className={style.card_title}>{c.airline}</h2>
                <h5>Origin: {c.origin} | Destination: {c.destination} </h5>
                <p className="card_text">{c.departureHour} / {c.arrivalHour}</p>
                </div>
                <div>
                <p className={style.card_text}>${c.price} | price | price</p>
                <Link to={`/ticket/${c.id}`} >
                  <button className={style.btn}>View Deal</button> 
                </Link>
                </div>
            </div>
            </li>
            <button onClick={() => removeFavorite(c.id)}>DELETE</button>
        </div>)      
        })
        :
        <h1>Add tickets to your favorite list!</h1>
        }        
    </div>
  )
}

export default Favs