import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/ProfileNav.module.css";

export default function ProfileNav() {
  return (
    <aside>
      <figure className={s.imgProfile}>
        <figcaption className={s.fig1}>Welcome</figcaption>
        <figcaption className={s.fig2}>JuanPepito52</figcaption>
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
  );
}
