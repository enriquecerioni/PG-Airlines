import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/Home.module.css";
import Display from "../components/Display";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className={s.Home}>
      <section>
        <div className={s.container}>
          <h1 className={s.title}>
            Showcase your thought provoking topics and ideas
          </h1>
          <p className={s.text}>
            Big company announcement or simple sub-header taking two or more
            lines.
          </p>
          <Link to="/login">
            <button className={s.btn}>Log In</button>
          </Link>
        </div>
        <div className={s.divImg}>
          <img
            className={s.img}
            src={
              "https://teelindy.com/wp-content/uploads/2019/03/default_image.png"
            }
            alt="#"
          />
        </div>
      </section>
      <SearchBar />
      <Display />
    </div>
  );
}
