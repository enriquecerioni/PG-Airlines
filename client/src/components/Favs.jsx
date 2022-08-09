import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./styles/Favs.module.css";
import style from "./styles/Ticket.module.css";
import { Link } from "react-router-dom";
import { deleteFavorite } from "../redux/actions/index"
import { toast } from "react-toastify";
import noFavs from './styles/assets/nofavorites.jpg'
import noFavsDark from './styles/assets/nofavoritesdark.png'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { darkModeContext } from './DarkModeContext';

function Favs() {
  const dispatch = useDispatch();
  const { darkMode } = useContext(darkModeContext)

  const flightList = useSelector(state => state.favoriteList)
  const airlines = useSelector((state) => state.airlines);

  function removeFavorite(id) {
    dispatch(deleteFavorite(id));
    toast.error("Deleted from favorites", {
      icon: "❌",
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
    <div className={ darkMode ? s.favs_container_dark : s.favs_containers}>
      <h1>Favorites List</h1>
      {flightList.length ? (
        flightList.map((c) => {
          return (
              <div className={s.favs_display}>

                <div className={style.cards} key={c.id}>
                  <li className={style.cards_item}>
                    <div className={darkMode ? style.card_dark : style.card}>
                      <div className="card_image">
                        <img src={c.logo} alt="#" width="100px" height="100px" />
                      </div>
                      <div className={style.card_content}>

                      {airlines.map((airline) => {
                          if(c.airlineId === airline.id){
                            return <h2 className={darkMode ? style.card_title_dark : style.card_title}>{airline.name}</h2>
                          }}
                        )}

                        <h5 className={darkMode ? style.card_desinfo_dark : style.card_desinfo}>
                          Origin: {c.origin} | Destination: {c.destination}{" "}
                        </h5>
                        <p className={darkMode ? style.card_desinfo_dark : style.card_desinfo}>
                          {c.departureHour} / {c.arrivalHour}
                        </p>
                      </div>
                      <div>
                        <p className={darkMode ? style.card_text_dark : style.card_text}>
                          ${c.price}
                        </p>
                        <Link to={`/ticket/${c.id}`}>
                          <button className={darkMode ? style.btn_dark : style.btn}>View Deal</button>
                        </Link>
                      </div>
                    </div>
                  </li>
                </div> 
                <IconButton size="large" onClick={() => removeFavorite(c.id)}><DeleteIcon color="primary" /></IconButton>             
              </div>                         
          );
        })
      ) : (
        <div className={s.empty_list}>
          <h1 className={s.h1}>Your list is empty</h1>
          <img className={s.img_empty} src={ darkMode ? noFavsDark : noFavs} alt="#" />   
          <h1 className={s.h1}>Add tickets to your favorites!</h1>       
        </div>
      )}
    </div>
  );
}

export default Favs;
