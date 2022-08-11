import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../styles/Ticket.module.css";
import { Link } from "react-router-dom";
import { addToFavorite } from "../../redux/actions/index";
import { CartContext } from "../CartComponents/CartContext";
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { IconButton, Chip } from "@mui/material";
import { darkModeContext } from '../DarkModeContext';
import Swal from 'sweetalert2'

function Ticket({
  id,
  airlineId,
  origin,
  price,
  logo,
  arrivalHour,
  departureHour,
  tickets,
  destination,
}) {

  const item = {
    id,
    airlineId,
    origin,
    price,
    logo,
    arrivalHour,
    departureHour,
    tickets,
    destination,
  };

  const { darkMode } = useContext(darkModeContext)

  const { addProductToCart,products } = useContext(CartContext);
  const airlines = useSelector((state) => state.airlines);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  const handleAddCart = (e) => {
    e.preventDefault();
    addProductToCart(item);
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

  // Para agregar a favoritos
  let favoriteList = useSelector((state) => state.favoriteList);
  let saved = favoriteList.find((o) => o.id === item.id);

  let listDisabled = saved ? true : false;

  function addFav(e) {
    if(user.length) {
      dispatch(addToFavorite(item));
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Log in to save your favorites!',
        confirmButtonColor: '#10408F'
      })
    }
  }

  useEffect(() => {
    localStorage.setItem('fav-list', JSON.stringify(favoriteList))
  }, [favoriteList])

  return (
  (<div className={ darkMode ? style.cards_dark : style.cards}>
      <li className={style.cards_item}>
        {user.length && !user[0].permissions ? (
          <IconButton
            id="mailBTN"
            color="error"
            disabled={listDisabled}
            onClick={() => addFav(item)}
          >
          { listDisabled ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        ) : !user.length ? (
          <IconButton
            id="mailBTN"
            color="error"
            disabled={listDisabled}
            onClick={() => addFav(item)}
          >
          { listDisabled ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        ) : null}

        <div className={style.info}>
          <button className={style.button}>i </button>
          <div className={style.propiedades}>
            <h5 className={style.a}>
              {departureHour} / {arrivalHour}{" "}
            </h5>
            <h5 className={style.a}> {origin} </h5>
          </div>
        </div>

        {user.length && !user[0].permissions ? (
          <IconButton
            id="addToCart"
            className={style.btnCart}
            onClick={handleAddCart}
            color='primary'
          >
            <AddShoppingCartIcon color='primary' />
          </IconButton>
        ) : !user.length ? (
          <IconButton
            id="addToCart"
            className={style.btnCart}
            onClick={handleAddCart}
            color='primary'
          >
            <AddShoppingCartIcon color="primary" />
          </IconButton>
        ) : null}

          {tickets < 50 ? (
            <Chip label={`Solo ${tickets} asientos disponibles!`} color="warning" size="small" icon={<NewReleasesIcon />} />
          ) : (
            <></>
          )}

        <div className={darkMode ? style.card_dark : style.card}>
          <div className={style.card_image}>
            <img className={style.logo} src={logo} alt="#" />
          </div>
          <div className={style.card_content}>
            {airlines.map((airline) => {
              if(airlineId === airline.id){
                return <h2 className={darkMode ? style.card_title_dark : style.card_title}>{airline.name}</h2>
              }
            })}
            <h5 className={darkMode ? style.card_desinfo_dark : style.card_desinfo}>
              Origin: {origin} | Destination: {destination}{" "}
            </h5>
          </div>
          <div>
            <strong><p className={darkMode ? style.card_text_dark : style.card_text}>${price}</p></strong>
            <Link to={`/ticket/${id}`}>
              <button className={darkMode ? style.btn_dark : style.btn}>View Deal</button>
            </Link>
          </div>
        </div>
      </li>
    </div>)
  );
}

export default Ticket;
