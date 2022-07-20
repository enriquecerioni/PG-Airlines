import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/NavBar.module.css";
import logo from './styles/logo.png'

export default function NavBar() {
  return (
    <nav>
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt='logo' />
      </Link>
      <ul className={s.navUl}> 
        <li>
          <Link className={s.navLink} to="/favs">
            Favs
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/login">
            Log In
          </Link>
        </li>
        <li>
          <Link className={s.navLink} to="/register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
