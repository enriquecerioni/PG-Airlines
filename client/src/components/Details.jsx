import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFlightByID, cleanDetails, createComment } from "../redux/actions/index.js";
import s from "./styles/Details.module.css";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

// import  addProductToCart  from './CartComponents/CartContext.jsx'
import { CartContext } from "./CartComponents/CartContext";
import { useContext } from "react";


function Details() {
  const { id } = useParams();


  const dispatch = useDispatch();
  const details = useSelector((state) => state.flight);
  const user = useSelector((state=>state.currentUser))
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

  const [value, setValue] = React.useState(2);

  //////////////////////
  // CREAR COMENTARIO //
  function validate(input) {
    let error = {}

    if(input.name === '') {
      error.name = 'Enter a name'
    } else {
      error.name = ''
    }

    if(input.rating === '') {
      error.rating = 'Enter a rating value'
    } else if(input.rating !== '' && (input.rating < 1 || input.rating > 5)) {
      error.rating = 'Rating value must be between 0 and 5'
    } else {
      error.rating = ''
    }

    if(input.comment === '') {
      error.comment = 'Enter a comment'
    } else {
      error.comment = ''
    }

    return error;
  }

  const [ error, setError ] = useState({
    rating: '',
    comment: '',
    name: '' 
  })

  const [ input, setInput ] = useState({
      rating: '',
      comment: '',
      name: '',
      moreInfo: [
        {
        flightName: '',
        origin: '',
        destination: ''        
      }
    ]
  })

  function handleInputChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  function handleSubmitComment(e) {
    e.preventDefault()

    if(
      input.rating && input.comment && input.name
    ) {

      dispatch(createComment(input))
      setInput({
        rating: '',
        comment: '',
        name: '',
        moreInfo: {
          flightName: '',
          origin: '',
          destination: ''        
        }        
      })

    } else {
        console.log('formulario incorrecto')
    }

  }


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
                  <label className={s.label} htmlFor="collapsible-checkbox">
                  <div className={s.divA}>
                    <img className={s.logo} src={d.logo} alt="Img" />
                    <div className={s.airline}>{d.airline}</div>
                    <div className={s.departureDate}>{d.departureDate}</div>

                    <div className={s.durationEstimated}>
                      {d.durationEstimated}h
                    </div>
                  </div>
                  </label>
                  <div className={s.info}> 
                  <div className={s.divInfo1}>

                    <div className={s.departureHour}>Departure Hour: {d.departureHour}</div>
                    <div className={s.durationEstimated}>
                      {d.durationEstimated}h
                    </div>
                    <div className={s.arrivalHour}>Arrival Hour: {d.arrivalHour}</div>
                  </div>
                  <div className={s.divInfo2}>
                    <div className={s.origin}>Origin: {d.origin}</div>
                    <div className={s.description}>Description: {d.description}</div>
                    <div className={s.destination}>Destination: {d.destination}</div>
                  </div>
                  </div>
                </div>
                <div key={d.flight} className={s.divPrices}>
                  <img className={s.logoPrice} src={d.logo} alt="Img" />
                  <div className={s.airlinePrice}>{d.airline}</div>
                  <div className={s.priceP}>${d.price}</div>
                  { user.length && !user[0].permissions ? <button
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
                  : null  
                }
                </div>
                
                {/* CREAR COMENTARIO - FALTAN RUTAS EN BACK */}
                <div>
                  <h3>Este vuelo fue publicado por: {d.airline} </h3>
                  <h3>RATING DE LA AEROLINEA</h3>
                  <h3>COMENTARIOS PREVIOS</h3>
                  {/* {comments.map(e => 
                    return (<span>{e.rating}</span>))} */}
                  <h3>Publicar comentario y rating</h3>
                  <h3>INPUT DE RATING</h3>
                  <form onSubmit={handleSubmitComment}>
                    <input 
                    type="number"
                    name='rating'
                    value={input.rating}
                    onChange={handleInputChange}
                    />
                    {error.rating && <span>{error.rating}</span>}

                    <h5>Input nombre de la persona que quiere hacer comentario</h5>
                    <input
                    type="text"
                    value={input.name}
                    name='name'
                    onChange={handleInputChange}
                    />
                    {error.name && <span>{error.name}</span>}

                    <h5>Input nombre del vuelo de donde lo conocen</h5>
                    <input 
                    type="text" 
                    name="flightName"
                    value={input.flightName}
                    onChange={handleInputChange}
                    />
                    <h5>Input del origin / destino</h5>
                    <input
                    type="text" 
                    name="origin"
                    value={input.origin}
                    onChange={handleInputChange}
                    />
                    <input
                    type="text" 
                    name="destination"
                    value={input.destination}
                    onChange={handleInputChange}
                    />
                    <h3>INPUT DE COMENTARIO</h3>
                    <input 
                    type="text" 
                    name='comment'
                    value={input.comment}
                    onChange={handleInputChange}
                    />
                    {error.comment && <span>{error.comment}</span>}

                    <button type="submit">Publicar</button>
                    <br />
                    <span>Su comentario puede ser eleminado si es conciderado inapropiado o se demuestra que no tiene relacion con la aerolinea</span>                    
                  </form> 
                </div>      
              <Box sx={{'& > legend': { mt: 2 },}}
                    >
                    <Typography component="legend">Controlled</Typography>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      />
              </Box>
               
              </div>
            )             
          })
        ) : (
          <h1>NADA</h1>
        )}

      </div>
    </div>
  );
}

export default Details;
