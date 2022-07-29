import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Ticket.module.css";
import { Link } from "react-router-dom";
import { addToFavorite, currentUser } from "../../redux/actions/index";
import { CartContext } from "../CartComponents/CartContext";
import { useContext } from "react";
import { toast } from "react-toastify";

function Ticket({id, origin, price, logo, airline, arrivalHour, departureHour,stock, destination}) {

  const item = { id, origin, price, logo, airline, arrivalHour, departureHour,stock, destination }

  const {addProductToCart} = useContext(CartContext)

  const dispatch = useDispatch();
  const user=useSelector(state=>state.currentUser)
console.log(user.permissions);
  // useEffect(()=>{
  //   dispatch(currentUser())
  // },[])

  const handleAddCart = (e) => {
    e.preventDefault();
    addProductToCart(item);
    toast.info("Ticket added to cart", {
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


  // Para agregar a favoritos
  let favoriteList = useSelector((state) => state.favoriteList);
  let saved = favoriteList.find((o) => o.id === item.id);

  let listDisabled = saved ? true : false;

  function addFav(e) {
    dispatch(addToFavorite(item));
    console.log(`agregaste ${id} `);
    toast.info("Ticket added to favorites", {
      icon: "✈️",
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className={style.cards}>
      <li className={style.cards_item}>
       { !user.permissions ? <button 
          id="mailBTN"
          disabled={listDisabled}
          onClick={() => addFav(item)}
        >
          Favorite
        </button>
      : null}
        <div className={style.info}>
          <button className={style.button}>i </button>
          <div className={style.propiedades}>
            <h5 className={style.a}>
              {departureHour} / {arrivalHour}{" "}
            </h5>
            <h5 className={style.a}> {origin} </h5>
          </div>
        </div>
        { !user.permissions ? <button id="addToCart"className={style.btnCart} onClick={handleAddCart}>
          Add to cart
        </button>
        : null
        }
        <div className={style.card}>
          <div className={style.card_image}>
            <img src={logo} alt="#" />
          </div>
          <div className={style.card_content}>
            <h2 className={style.card_title}>{airline}</h2>
            <h5>
              Origin: {origin} | Destination: {destination}{" "}
            </h5>
          </div>
          <div>
            <p className={style.card_text}>${price} | price | price</p>
            <Link to={`/ticket/${id}`}>
              <button className={style.btn}>View Deal</button>
            </Link>
          </div>
        </div>
        { stock < 40 ? <span>{`Solo ${stock} asientos disponibles`}</span> : <></> }
      </li>
    </div>
  );
}

export default Ticket;
