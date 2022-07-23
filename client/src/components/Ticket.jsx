import React from 'react'
import style from './styles/Ticket.module.css'
import { Link } from 'react-router-dom'

function Ticket({airline, id, logo, departureHour, arrivalHour, price, origin}) {
    const source = 'https://media.istockphoto.com/vectors/airplane-fly-out-logo-plane-taking-off-stylized-sign-vector-id1137971264?k=20&m=1137971264&s=612x612&w=0&h=_Mds3bkTPPoIBHsa9orqQCW6gO7dka96d3BJvdh7sHg='
    // console.log(flight)

  return (
    <div className={style.cards} key={id} >
        <li className={style.cards_item}>
        <div className={style.info}>
              
              <button className={style.button}>i </button>
              <div className={style.propiedades}>
                <h5 className={style.a}>{departureHour} / {arrivalHour} </h5>
                <h5 className={style.a}> {origin} </h5>
              </div>

            </div>
        <div className={style.card}>
            <div className="card_image"><img src={logo} width='100px' height='100px'/></div>
            <div className={style.card_content}>
            <h2 className={style.card_title}>{airline}</h2>
            <h4>🏁 {origin}</h4>
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