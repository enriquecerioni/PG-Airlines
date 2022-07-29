import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/UserProfile.module.css";

export default function UserProfile() {
  console.log("LLEGUE");
  return (
    <div className={s.container}>
      <aside>
        <figure className={s.imgProfile}>
          <figcaption className={s.fig1}>Welcome</figcaption>
          <figcaption className={s.fig2}>Username</figcaption>
          <img
            className={s.imgProfile}
            src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            alt="profile"
          />
        </figure>
        <div className={s.divLi}>
          <ul>
            <li id="AccInfo">
              <Link className={s.link} to="/profile">
                Account Information
              </Link>
            </li>
            <li id="TicketsBought">
              <Link
                className={s.link}
                to="/purchases" /*PODER DEJAR REVIEW A LA EMPRESA*/
              >
                My Scheduled Flights
              </Link>
            </li>
            {/* user.permissions === true*/}
            {/*Admin Only page, manage perfil de Airline*/}
            {/*PODER DEJAR REVIEW A LA EMPRESA*/}
            <li id="MyAirline">
              <Link className={s.link} to="/airlineProfile">
                Manage Airline
              </Link>
            </li>
            {/*Admin Only page, donde postear vuelos*/}
            <li id="OwnFlights">
              <Link className={s.link} to="/catalog">
                Manage Airline Flights
              </Link>
            </li>
            {/* <li id="ManageUsers" /* SUPER ADMIN ONLY Page manage users > */}
            {/* Manage Users */}
            {/* </li> */}
            {/* <li id="ManageAirlines" /* SUPER ADMIN ONLY Page manage users > */}
            {/* Manage Airlines */}
            {/* </li> */}
          </ul>
        </div>
      </aside>
      {/* <h1>image</h1> */}
      <div className={s.infoContainer}>
        <h1 className={s.title}>Account Information</h1>
        <span className={s.text}>Manage your account settings and other information</span>
        <div className={s.info}>
          <h1>Profile Information</h1>
          <h4>Email:</h4>
          <h4>First name:</h4>
          <h4>Last name:</h4>
          {/* <h4>Date of Birth:</h4> */}
          <h4>Phone:</h4>
          <h4>Origin country:</h4>
          <h4>Display Language:</h4>
          <h4>Change Password:</h4>
        </div>
      </div>
    </div>
  );
}
