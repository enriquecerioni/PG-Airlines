import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFlightByID, cleanDetails } from "../redux/actions/index.js";
import s from "./styles/Details.module.css";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

// import  addProductToCart  from './CartComponents/CartContext.jsx'
import { CartContext } from "./CartComponents/CartContext";
import { useContext } from "react";

function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const details = useSelector((state) => state.flight);
  // console.log(details)

  // const item = details.map(e => {
  //       let obj = {
  //         id: e.flight,
  //         origin: e.origin,
  //         price: e.price,
  //         logo: e.logo,
  //         airline: e.airline,
  //         arrivalHour: e.arrivalHour,
  //         departureHour: e.departureHour,
  //   }
  //   return obj
  // })
  // console.log(item)

  const { addProductToCart } = useContext(CartContext);

  const handleAddToCart = ({
    id,
    origin,
    price,
    logo,
    airline,
    arrivalHour,
    departureHour,
  }) => {
    // console.log({id, origin, price, logo, airline, arrivalHour, departureHour})
    addProductToCart({
      id,
      origin,
      price,
      logo,
      airline,
      arrivalHour,
      departureHour,
    });
    toast.info("Added to cart", {
      icon: "✈️",
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    dispatch(getFlightByID(id));
    return () => {
      dispatch(cleanDetails());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className={s.container}>
        <Link className={s.links} to="/">
          <button className={s.btnHome}>Go to Home</button>
        </Link>

        {details ? (
          details.map((d) => {
            return (
              <div key={d.flight}>
                <div className={s.detail}>
                  <input className={s.input} type="checkbox" id="collapsible-checkbox" />
                  <label className={s.label} for="collapsible-checkbox">
                  <div className={s.divA}>
                    <img className={s.logo} src={d.logo} alt="Img" />
                    <div className={s.airline}>{d.airline}</div>
                    <div className={s.departureDate}>{d.departureDate}</div>

                    <div className={s.durationEstimated}>
                      {d.durationEstimated}
                    </div>
                  </div>
                  </label>
                  <div className={s.info}> 
                    <div className={s.arrivalHour}>{d.arrivalHour}</div>
                    <div className={s.arrivalDate}>{d.arrivalDate}</div>
                    <div className={s.departureHour}>{d.departureHour}</div>
                    <div className={s.description}>{d.description}</div>
                    <div className={s.destination}>{d.destination}</div>
                    <div className={s.origin}>{d.origin}</div>
                  </div>
                </div>
                <div key={d.flight} className={s.divPrices}>
                  <img className={s.logoPrice} src={d.logo} alt="Img" />
                  <div className={s.airlinePrice}>{d.airline}</div>
                  <div className={s.priceP}>${d.price}</div>
                  <button
                    className={s.btn}
                    onClick={() =>
                      handleAddToCart({
                        id: d.flight,
                        origin: d.origin,
                        price: d.price,
                        logo: d.logo,
                        airline: d.airline,
                        arrivalHour: d.arrivalHour,
                        departureHour: d.departureHour,
                      })
                    }
                  >
                    Reservar
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>NADA</h1>
        )}
      </div>
    </div>
  );
}

export default Details;
