import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import logo from "../styles/logo.png";
import shoppingCart from "../styles/shopping-cart.png";
import { logOut } from "../scripts/auth";
import { CartContext } from "../CartComponents/CartContext";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { toast } from "react-toastify";
import EstadoUsuario from "../scripts/auth";

export default function NavBar() {
  const { products } = useContext(CartContext);
  console.log(EstadoUsuario);
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(EstadoUsuario);
  const handleClose = () => setOpen(false);

  const [stateCart, setStateCart] = useState(products.length);

  useEffect(() => {
    setStateCart(products.length);
  }, [products, user]);

  function handleLogOut(e) {
    e.preventDefault();
    logOut();
    // setAlert(true)
    toast("Log out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      newestOnTop: true,
      progress: undefined,
      type: "info",
    });
  }

  return (
    <nav>
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      {EstadoUsuario === false ? (
        <ul className={s.navUl}>
          <li id="catalog">
            <Link className={s.navLink} to="/catalog">
              Catalog
            </Link>
          </li>
          <li id="offers">
            <Box sx={{ color: "action.active" }}>
              <Link className={s.navLink} to="/offers">
                <Badge color="secondary" badgeContent={5}>
                  <LoyaltyIcon />
                  Offers
                </Badge>
              </Link>
            </Box>
          </li>
          <li id="favs">
            <Link className={s.navLink} to="/favs">
              Favs
            </Link>
          </li>
          <li id="logIn">
            <Link className={s.navLink} to="/login">
              Log In
            </Link>
          </li>
          <li id="register">
            <Link className={s.navLink} to="/register">
              Sign In
            </Link>
          </li>
          {/* <li id="logOut">
            <button
              className={s.navLink_logout}
              onClick={(e) => handleLogOut(e)}
            >
              Log Out
            </button>
          </li> */}
          {/* --------------------------------------------------------------------  */}
          {/* <li>
            <button id="addAirline">
              <Link to="/register/airline">Add your airline</Link>
            </button>
          </li>
          <li>
            <button id="myProfile">My profile</button>
          </li> */}
          {/* --------------------------------------------------------------------  */}
          <li id="carrito" className={s.cart_container}>
            <Link className={s.navLink} to="/cart">
              <img className={s.cart} src={shoppingCart} />
            </Link>
          </li>
          <h5 id="nCarrito" className={s.price}>
            {stateCart ? stateCart : 0}
          </h5>
        </ul>
      ) : EstadoUsuario === true ? (
        <ul className={s.navUl}>
          <li id="catalog">
            <Link className={s.navLink} to="/catalog">
              Catalog
            </Link>
          </li>
          <li id="offers">
            <Box sx={{ color: "action.active" }}>
              <Link className={s.navLink} to="/offers">
                <Badge color="secondary" badgeContent={5}>
                  <LoyaltyIcon />
                  Offers
                </Badge>
              </Link>
            </Box>
          </li>
          <li id="favs">
            <Link className={s.navLink} to="/favs">
              Favs
            </Link>
          </li>
          <li id="logOut">
            <button
              className={s.navLink_logout}
              onClick={(e) => handleLogOut(e)}
            >
              Log Out
            </button>
          </li>
          <li id="carrito" className={s.cart_container}>
            <Link className={s.navLink} to="/cart">
              <img className={s.cart} src={shoppingCart} />
            </Link>
          </li>
          <h5 id="nCarrito" className={s.price}>
            {stateCart ? stateCart : 0}
          </h5>
        </ul>
      ) : (
        "Loading"
      )}
    </nav>
  );
}
