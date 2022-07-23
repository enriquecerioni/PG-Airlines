import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./styles/NavBar.module.css";
import logo from "./styles/logo.png";
import shoppingCart from "./styles/shopping-cart.png";
import { logOut } from "./scripts/auth";


export default function NavBar() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleCart = (e) => {
    e.preventDefault();
    setCartOpen(!cartOpen);
  };
  return (
    <nav>
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
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
        <li>
          <button onClick={()=>logOut()}>Log Out</button>
        </li>
        <div className={s.bkg}>
          <li>
            <img className={s.cart} src={shoppingCart} onClick={handleCart} />
            {/* {cartOpen ? (
              <div className={s.cartOpen}>
                <BoxCart onClick={handleCart} />
              </div>
            ) : (
              <></>
            )} */}
          </li>
        </div>
      </ul>
    </nav>
  );
}
