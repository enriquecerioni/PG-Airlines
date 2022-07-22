import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import s from './styles/Favs.module.css'
import style from './styles/Ticket.module.css'
import { Link } from 'react-router-dom';


function Favs() {

  // function removeFavorite(id) {
  //   let index = favorite.indexOf(id);
  //   let res = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
  //   setFavorite(res);
  // }

  const flightList = useSelector(state => state.favoriteList)
  console.log(flightList)

  return (
    <div className={s.favs_containers}>
        {flightList.length ? 
        flightList.map(c => {
          return (<div className={style.cards} key={c.id}>
            <li className={style.cards_item}>
            <div className={style.card}>
                <div className="card_image"><img src={c.logo} width='100px' height='100px'/></div>
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
        </div>)      
        })
        :
        <h1>Add tickets to you favorite list!</h1>
        }        
    </div>
  )
}

export default Favs