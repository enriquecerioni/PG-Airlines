import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from '../styles/NavBar.module.css';
import logo from '../styles/logo.png';
import shoppingCart from '../styles/shopping-cart.png';
import { logOut } from '../scripts/auth';
import { CartContext } from '../CartComponents/CartContext';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { toast } from "react-toastify";

export default function NavBar() {

  const { products } = useContext(CartContext);

  const [ alert, setAlert] = useState(false)
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [stateCart, setStateCart] = useState(products.length);

  useEffect(() => {
    setStateCart(products.length);
  }, [products]);

  function handleLogOut() {
    logOut()
    toast.success('✔ Log out!', {
      // position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <nav >
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      <ul className={s.navUl}>
        <li id="catalog">
          <Link className={s.navLink} to="/catalog">
            Catalog
          </Link>
        </li>
        <li id="offers">
          <Box sx={{ color: 'action.active' }}>
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
              Register
            </Link>
          </li>
          <li id="logOut">
            <button className={s.navLink_logout} onClick={() => handleLogOut()}>Log Out</button>
          </li>
          {/* --------------------------------------------------------------------  */}
          <li>
            <button id="addAirline">Add airline</button>
          </li>
          <li>
            <button id="myProfile">My profile</button>
          </li>
          {/* --------------------------------------------------------------------  */}
          <li id="carrito" className={s.cart_container}>
            <Link className={s.navLink} to="/cart"  >
              <img className={s.cart} src={shoppingCart} />
            </Link>
          </li>
          <h5 id="nCarrito" className={s.price}>{stateCart ? stateCart : 0}</h5>
      </ul>
      { alert && <Alert onClose={() => setAlert(false)} severity="info">Log out successfully!</Alert>}
    </nav> 
  );
}
