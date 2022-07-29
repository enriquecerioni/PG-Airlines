import React from "react";
import ProfileNav from "./ProfileNav";
import { Link } from "react-router-dom";
import s from "../styles/AirlineProfile.module.css";

export default function AirlineProfile() {
  return (
    <div className={s.container}>
      <ProfileNav />
      <div className={s.infoContainer}>
        <h2 className={s.title}>
          You haven't registered your airline yet. Want to get started?
        </h2>
        <Link to="/register/airline">
          <button className={s.btn}>Register Airline</button>
        </Link>
      </div>
    </div>
  );
}
