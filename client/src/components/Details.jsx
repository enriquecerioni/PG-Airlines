import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllFlights } from "../redux/actions/index.js";
import s from "./styles/Details.module.css";
// import { Link } from "react-router-dom";
// import logo from './styles/logo.png'
import NavBar from "./NavBar.jsx";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.flights);

  useEffect(() => {
    const savedData = dispatch(getAllFlights());
    return savedData
  }, [dispatch]);

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
    <div className={s.container}>
      <NavBar />
      {
        a ? (
          <div className={s.detail}>
            <div className={s.idFlight}>{a.airline}</div>
            <div className={s.idFlight}>{a.arrivalDate}</div>
            <div className={s.idFlight}>{a.arrivalHour}</div>
            <div className={s.idFlight}>{a.departureDate}</div>
            <div className={s.idFlight}>{a.departureHour}</div>
            <div className={s.idFlight}>{a.description}</div>
            <div className={s.idFlight}>{a.destination}</div>
            <div className={s.idFlight}>{a.durationEstimated}</div>
            <div className={s.idFlight}>{a.flight}</div>
            <img className={s.idFlight} src={a.logo} alt="Img" />
            <div className={s.idFlight}>{a.origin}</div>
            <div className={s.idFlight}>{a.price}</div>
          </div>
        ) : (
          "no hay nada che"
        )
      }
    </div>
  );
}

export default Details;
