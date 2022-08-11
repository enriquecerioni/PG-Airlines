import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFlightByID, cleanDetails, getAllAirlines, getAllUsers, getAllComments } from "../redux/actions/index.js";
import s from "./styles/Details.module.css";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { CartContext } from "./CartComponents/CartContext";
import { useContext } from "react";
import FeedBack from "./FeedBack.jsx";

function Details() {
  let { id } = useParams();
  id = Number(id);

  const dispatch = useDispatch();
  const details = useSelector((state) => state.flight);
  const user = useSelector((state) => state.currentUser);
  const airlines = useSelector((state) => state.airlines);

  const { addProductToCart,products } = useContext(CartContext);

  const handleAddToCart = ({
    id,
    origin,
    price,
    logo,
    airline,
    arrivalHour,
    departureHour,
    tickets,
    destination
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
      tickets,
      destination
    });
    let cant=0;
    products?.map((p)=>{
      if(p.id===id)cant++
      if(p.id===id && p.amount < p.tickets){
        toast.info("Ticket added to cart", {
          icon: "✈️",
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
    if(!cant) {
      toast.info("Ticket added to cart", {
        icon: "✈️",
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getFlightByID(id));
    dispatch(getAllAirlines());
    return () => {
      dispatch(cleanDetails());
    };
  }, [dispatch, id]);

  let airline = airlines.map((airline) => {
    if (details.airlineId === airline.id) {
      return airline.name
    }
  })

  return (
    <div>
      <div className={s.container}>

        <div className={s.links}>
          <Link to="/">
            <button className={s.btnHome}>Go to Home</button>
          </Link>          
        </div>
        
        {details ? (
          <div key={details.id}>
            <div className={s.detail}>

              <input
                className={s.input}
                type="checkbox"
                id="collapsible-checkbox"
              />

              <label className={s.label} for="collapsible-checkbox">
                <div className={s.divA}>
                  <img className={s.logo} src={details.logo} alt="Img" />
                  <div className={s.airline}>{airline}</div>
                  <div className={s.departureDate}>{details.departureDate}</div>
                  <div className={s.durationEstimated}>
                    {details.durationEstimated}h
                  </div>
                </div>
              </label>

              <div className={s.info}>

                <div className={s.divInfo1}>
                  <div className={s.departureHour}>
                    Departure Hour: {details.departureHour}
                  </div>
                  <div className={s.durationEstimated}>
                    {details.durationEstimated}h
                  </div>
                  <div className={s.arrivalHour}>
                    Arrival Hour: {details.arrivalHour}
                  </div>
                </div>

                <div className={s.divInfo2}>
                  <div className={s.origin}>Origin: {details.origin}</div>
                  <div className={s.description}>
                    Description: {details.description}
                  </div>
                  <div className={s.destination}>
                    Destination: {details.destination}
                  </div>
                </div>     

              </div>
              
            </div>           

              <div key={details.id} className={s.divPrices}>
                <img className={s.logoPrice} src={details.logo} alt="Img" />
                <div className={s.airlinePrice}>{airline}</div>
                <div className={s.priceP}>${details.price}</div>
                {user.length && !user[0].permissions ? (
                  <button
                    className={s.btn}
                    onClick={() =>
                      handleAddToCart({
                        id: details.id,
                        origin: details.origin,
                        price: details.price,
                        logo: details.logo,
                        airline: airline,
                        arrivalHour: details.arrivalHour,
                        departureHour: details.departureHour,
                        tickets:details.tickets,
                        destination:details.destination
                      })
                    }>Add to cart</button>
                ) : !user.length ? (
                  <button
                    className={s.btn}
                    onClick={() =>
                      handleAddToCart({
                        id: details.id,
                        origin: details.origin,
                        price: details.price,
                        logo: details.logo,
                        airline: airline,
                        arrivalHour: details.arrivalHour,
                        departureHour: details.departureHour,
                        tickets:details.tickets,
                        destination:details.destination
                      })
                    }>Add to cart</button>

                ): null }
       
            </div> 

            <FeedBack airlineId={details.airlineId} airline={airline} />   

          </div>
        ) : null }
        
      </div>
    </div>
  );
}

export default Details;
