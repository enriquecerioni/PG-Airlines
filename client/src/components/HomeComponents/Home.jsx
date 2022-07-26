import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css";
import Display from "./Display";
import SearchBar from "./SearchBar";
import test from '../styles/assets/test3.png'

export default function Home() {
  return (
    <div className={s.Home}>
      <section>
        <div className={s.container}>
          <h1 className={s.title}>
          Browse our options to get the best deals on airline tickets, no matter where you’re headed.
          </h1>
          <p className={s.text}>
          Explore destinations and find great deals on plane tickets. 
          </p>
          <Link to="/login">
            <button className={s.btn}>Log In</button>
          </Link>
        </div>
        <div className={s.divImg}>
          <img
            className={s.img}
            src={test}
            alt="#"
          />
        </div>
      </section>
      <SearchBar />
      <Display />
    </div>
  );
}
