import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css";
import Display from "./Display";
import SearchBar from "./SearchBar";
import test from "../styles/assets/test3.png";

export default function Home() {
  return (
    <div className={s.Home}>
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
            <p className={s.scrollText}>Scroll down to navigate through flights</p>
            <div className={s.scrollDown}></div>
          </a>

          {/* <Link id="logInBtn" to="/register/airline">
            <button className={s.btn}>Log In</button>
          </Link> */}
        </div>
        <div className={s.divImg}>
          <img className={s.img} src={test} alt="#" />
        </div>
      </div>
      <div className={s.contactContainer}>
        <div className={s.contact}>
          <p className={s.text}>if you're interested in working with us...</p>
          <Link to="/register">
            <button id="btnHomeGuest" className={s.btn}>
              Contact Us!
            </button>
          </Link>
          <Link to="/register/airline">
            <button id="btnHomeUser" className={s.btn}>
              Contact Us!
            </button>
          </Link>
          <p>You must be logged in first!</p>
        </div>
      </div>
      <div id="sec-2" className={s.sec2}>
      <div id="divInv" className={s.divInv}></div>
        <SearchBar />
        <Display />
      </div>
    </div>
  );
}
