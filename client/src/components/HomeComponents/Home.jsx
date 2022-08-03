import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css";
import Display from "./Display";
import SearchBar from "./SearchBar";
import test from "../styles/assets/test3.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/index";
import Loader from "./Loader";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import Administration from "./Administration";
import Footer from "./Footer";

export default function Home() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  console.log(user);
  useEffect(() => {
    dispatch(getAllUsers());
    setInterval(() => {
      setIsDisplayed(true);
    }, 3000);
  }, [dispatch]);

  return (
    <>
      {!isDisplayed ? (
        <Loader />
      ) : !user[0]?.superAdmin ? (
        <div className={s.Home}>
          {/* <NavBar /> */}
          <div id="sec-1" className={s.sec1}>
            <div className={s.container}>
              <h1 className={s.title}>
                Browse our options to get the best deals on airline tickets, no
                matter where you’re headed.
              </h1>
              <p id="ad" className={s.text}>
                Explore destinations and find great deals on plane tickets.
              </p>
              <a href="#sec-2">
                <p className={s.scrollText}>
                  Scroll down to navigate through flights
                </p>
                <div className={s.scrollDown}></div>
              </a>
            </div>
            <div className={s.divImg}>
              <img className={s.img} src={test} alt="#" />
            </div>
          </div>

          <div id="sec-2" className={s.sec2}>
            <div id="divInv" className={s.divInv}></div>
            <SearchBar />
            <Display />
            <div className={s.contactContainer}>
              <div className={s.contact}>
                <p className={s.text}>
                  If you're interested in working with us...
                </p>
                <div id="btnHomeGuest">
                  <Link to="/register/airline">
                    <button className={s.btn}>Contact Us!</button>
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
            <div className={s.whatsapp}>
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
            </div>
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
