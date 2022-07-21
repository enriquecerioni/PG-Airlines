import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllFlights } from "../redux/actions/index.js";
import s from "./styles/Details.module.css";
import { Link } from "react-router-dom";
// import logo from './styles/logo.png'
import NavBar from "./NavBar.jsx";

function Details() {
  const { id } = useParams();
  // const dispatch = useDispatch();
  const details = useSelector((state) => state.flights);

  const flightA = (item) => {
    return item.flight === id;
  };
  const a = details.find(flightA);
  console.log(a);

  // const detail = a.map(e => {
  //   return e
  // })
  // console.log(detail)
  return (
    <div>
      <div className={s.container}>
        <Link className={s.links} to="/">
          <button className={s.btnHome}>Go to Home</button>
        </Link>
        {a ? (
          <div className={s.detail}>
            <div className={s.divA}>
              <img className={s.logo} src={a.logo} alt="Img" />
              <div className={s.airline}>{a.airline}</div>
              <div className={s.departureDate}>{a.departureDate}</div>

              <div className={s.durationEstimated}>{a.durationEstimated}</div>
              <button className={s.btnDrop}>˅</button>
            </div>
            <div className={s.info}>
              <div className={s.arrivalHour}>{a.arrivalHour}</div>
              <div className={s.arrivalDate}>{a.arrivalDate}</div>
              <div className={s.departureHour}>{a.departureHour}</div>
              <div className={s.description}>{a.description}</div>
              <div className={s.destination}>{a.destination}</div>
              <div className={s.origin}>{a.origin}</div>
            </div>
          </div>
        ) : (
          "no hay nada che"
        )}
        <div className={s.divPrices}>
          <img className={s.logoPrice} src={a.logo} alt="Img" />
          <div className={s.airlinePrice}>{a.airline}</div>
          <div className={s.priceP}>${a.price}</div>
          <Link className={s.links} to="/login">
            <button className={s.btn}>Reservar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;
