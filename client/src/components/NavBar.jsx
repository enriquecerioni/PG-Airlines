import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/NavBar.module.css";
import logo from './styles/logo.png'
import { estadoUsuario, logOut } from "./scripts/auth";

export default function NavBar() {
  const estado = estadoUsuario()
  console.log(estado)
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
       { !estado && <li>
          <Link className={s.navLink} to="/login">
            Log In
          </Link>
        </li>
      } 
       { !estado && <li>
          <Link className={s.navLink} to="/register">
            Register
          </Link>
        </li>
      }
      
        <li>
          <button className={s.navLink} onClick={()=>logOut()}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
