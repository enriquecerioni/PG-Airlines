import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/Favs.module.css'
import { Link } from 'react-router-dom';

function Favs() {

  // function removeFavorite(id) {
  //   let index = favorite.indexOf(id);
  //   let res = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
  //   setFavorite(res);
  // }

  // this variable holds the list of favorite recipes, we will use it to render all the fav ecipes
  // let findfavorite = recipes.filter(recipe => favorite.includes(recipe.id));


  const flightList = useSelector(state => state.favoriteList)
  console.log(flightList)

  return (
    <div className={style.favs_containers}>
      {!flightList.length ? <h1>Add tickets to you favorite list!</h1>
      :
      flightList.map(e => {
        <div className={style.card}>
        <div className="card_image"><img src={e.logo} width='100px' height='100px'/></div>
        <div className={style.card_content}>
        <h2 className={style.card_title}>{e.airline}</h2>
        <h5>Origin: {e.origin} | Destination: {e.destination} </h5>
        <p className="card_text">{e.departureHour} / {e.arrivalHour}</p>
        </div>
        <div>
        <p className={style.card_text}>${e.price} | price | price</p>
        <Link to={`/ticket/${e.id}`} >
          <button className={style.btn}>View Deal</button> 
        </Link>
        </div>
      </div>
      })
      }
    </div>
  )
}

export default Favs