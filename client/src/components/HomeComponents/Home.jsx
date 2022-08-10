import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css";
import Display from "./Display";
import SearchBar from "./SearchBar";
import test from "../styles/assets/test3.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAirlineId,
  getAllAirlines,
  getAllUsers,
} from "../../redux/actions/index";
import Loader from "./Loader";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import Administration from "./Administration";
import Footer from "./Footer";
import { darkModeContext } from "../DarkModeContext";
import plane from "../styles/assets/plane.svg";
import planeDark from "../styles/assets/plane_dark.svg";
import dealInput from "../styles/assets/deal-input.svg";

export default function Home() {
  const { darkMode } = useContext(darkModeContext);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const airlines = useSelector((state) => state.airlines);
  // console.log(airlines);
  // console.log(user);
  const currentAirlineId = airlines?.filter(
    (air) => air.userId === user[0]?.id
  );
  // console.log(currentAirlineId[0]?.id);
  // console.log(user);

  if(currentAirlineId[0]?.id) dispatch(getAirlineId(currentAirlineId[0]?.id));
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAirlines());
    setInterval(() => {
      setIsDisplayed(true);
    }, 3000);
    
  }, [dispatch]);


  return (
    <>
      {!isDisplayed ? (
        <Loader />
      ) : !user[0]?.superAdmin ? (
        <div className={darkMode ? s.Home_dark : s.Home}>
          {/* <NavBar /> */}
          <div id="sec-1" className={darkMode ? s.sec1_dark : s.sec1}>
            <div className={s.container}>
              <h1 className={darkMode ? s.title_dark : s.title}>
                Browse our options to get the best deals on airline tickets, no
                matter where you’re headed.
              </h1>
              <p id="ad" className={darkMode ? s.textHome_dark : s.textHome}>
                Explore destinations and find great deals on plane tickets.
              </p>
              <a href="#sec-2">
                <p className={darkMode ? s.scrollText_dark : s.scrollText}>
                  Scroll down to navigate through flights
                </p>
                <div
                  className={darkMode ? s.scrollDown_dark : s.scrollDown}
                ></div>
              </a>
            </div>
            <div className={s.divImg}>
              <img className={s.img} src={test} alt="#" />
            </div> 
          </div>

          <div id="sec-2" className={darkMode ? s.sec2_dark : s.sec2}>
            <div id="divInv" className={s.divInv}></div>
            <SearchBar />
            <Display />
            <div className={darkMode ? s.contactContainer_dark : s.contactContainer}>
              <div className={darkMode ? s.contact_dark : s.contact}>
                <img src={darkMode ? planeDark : plane} alt="airplane" className={s.planeInput} />
                <p className={darkMode ? s.text_dark : s.text}>
                  If you're interested in working with us
                </p>
                <img src={dealInput} alt="deal" className={s.dealInput} />
              </div>
              <div id="btnHomeGuest">
                <Link to="/register/airline">
                  <button className={s.btn}>Contact Us!</button>
                </Link>
              </div>
            </div>
            <Footer />
            {/* <div className={s.whatsapp}>
              <Button
                id="whatsapp"
                href="https://walink.co/000b86"
                target="_blank"
                variant="contained"
                size="medium"
              >
                <WhatsAppIcon></WhatsAppIcon>
                <p>Chat</p>
              </Button>
            </div> */}
          </div>
        </div>
      ) : (
        user.length &&
        user[0].superAdmin && (
          <>
            <div>
              <Administration />
            </div>
          </>
        )
      )}
    </>
  );
}
