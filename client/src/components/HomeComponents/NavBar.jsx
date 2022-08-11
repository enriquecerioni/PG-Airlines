import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import logo from "../styles/assets/logo14.png";
import logo2 from "../styles/assets/logo14.png";
import shoppingCart from "../styles/shopping-cart.png";
import { logOut } from "../scripts/auth";
import { CartContext } from "../CartComponents/CartContext";
import { getAllUsers } from "../../redux/actions";
// import { Alert, dividerClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
// import ImageAvatars from "../avatar";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { toast } from "react-toastify";
import defaultProfilePic from "../styles/defaultProfilePic.png";
// import { currentUser } from "../../redux/actions";
import DarkModeSwitch from "../DarkModeSwitch";
import { darkModeContext } from "../DarkModeContext";

export default function NavBar({ toogleTheme }) {
  const { products } = useContext(CartContext);
  const dispatch = useDispatch();

  // const [alert, setAlert] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);
  const navigate = useHistory();
  const currentUser = useSelector((state) => state.currentUser)[0];
  const users = useSelector((state) => state.allUsers);
  // console.log("desde el nav", currentUser);
  const [stateCart, setStateCart] = useState(products.length);
  const user = useSelector((state) => state.currentUser);
  const toggle = document.querySelector("#toggle");
  const nav = document.querySelector("#navUl");
  const navLinks = document.querySelectorAll("#navUl li");
  function navSlide() {
    // const menutoggle = document.querySelector("#toggle");
    // toggle.addEventListener("click", () => {
    toggle.classList.toggle(s.active);
    nav.classList.toggle(s.navActive);

    navLinks.forEach((link, index) => {
      console.log(link);
      console.log(index);
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinksFade 0.5s ease forwards ${
          index / 7 + 0.2
        }s`;
      }
    });
    // });
  }

  useEffect(() => {
    setStateCart(products.length);
    dispatch(getAllUsers());
  }, [products, dispatch]);

  async function handleLogOut(e) {
    e.preventDefault();
    await logOut();
    // window.location.reload();
    toast.success("✔ Log out!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "info",
    });
    navigate.replace("/");
    window.location.reload();
  }

  const { darkMode } = useContext(darkModeContext);

  return (
    <nav className={darkMode ? s.nav_container_dark : s.nav_container}>

      <Link className={s.navImg} to="/">
        {darkMode ? (
          <img className={s.logoImg} src={logo2} alt="logo" />
        ) : (
          <img className={s.logoImg} src={logo} alt="logo" />
        )}
        {/* <img className={s.logoImg} src={logo} alt="logo" /> */}
      </Link>

      <ul id="navUl" className={darkMode ? s.navUl_dark : s.navUl}>
        <DarkModeSwitch
          className={darkMode ? s.darkModeBtn_dark : s.darkModeBtn}
          toogleTheme={toogleTheme}
        />

        {user.length && user[0].superAdmin ? (
          <>
            <li>
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/business"
              >
                Business
              </Link>
            </li>
            {/* <li id="catalog">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/catalog"
              >
                Catalog
              </Link>
            </li> */}
            <li>
              <Link to="/profile">
                <img
                  className={darkMode ? s.imgProfile_dark : s.imgProfile}
                  src={
                    currentUser.image ? currentUser.image : defaultProfilePic
                  }
                  alt="image"
                />
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
          </>
        ) : user.length && user[0].permissions ? (
          <>
            <li id="catalog">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/catalog"
              >
                Catalog
              </Link>
            </li>
            <li id="sales">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/sales"
              >
                Sales
              </Link>
            </li>
            <li>
              {/* <a id="myProfile"> */}
              <Link to="/profile">
                <img
                  className={darkMode ? s.imgProfile_dark : s.imgProfile}
                  src={
                    currentUser.image ? currentUser.image : defaultProfilePic
                  }
                  alt="image"
                />
              </Link>
              {/* </a> */}
            </li>
            <li id="logOut">
              <button
                className={s.navLink_logout}
                onClick={(e) => handleLogOut(e)}
              >
                Log Out
              </button>
            </li>
          </>
        ) : user.length && !user[0].permissions ? (
          <>
            <li id="favs">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/favs"
              >
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

            <li>
              {/* <a id="myProfile"> */}
              <Link to="/profile">
                <img
                  className={darkMode ? s.imgProfile_dark : s.imgProfile}
                  src={
                    currentUser.image ? currentUser.image : defaultProfilePic
                  }
                  alt="image"
                />
              </Link>
              {/* </a> */}
            </li>
            <li id="carrito" className={s.cart_container}>
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/cart"
              >
                <img className={s.cart} alt="#" src={shoppingCart} />
              </Link>
              <h5 id="nCarrito" className={s.price}>
                <div className={darkMode ? s.numCart_dark : s.numCart}>
                  {stateCart ? stateCart : 0}
                </div>
              </h5>
            </li>
          </>
        ) : (
          <>
            {/*guest */}
            <li id="favs">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/favs"
              >
                Favs
              </Link>
            </li>
            <li id="logIn">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/login"
              >
                Log In
              </Link>
            </li>
            <li id="register">
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/register"
              >
                Sign In
              </Link>
            </li>
            <li id="carrito" className={s.cart_container}>
              <Link
                className={darkMode ? s.navLink_dark : s.navLink}
                to="/cart"
              >
                <img className={s.cart} alt="#" src={shoppingCart} />
              </Link>
              <h5 id="nCarrito" className={s.price}>
                <div className={darkMode ? s.numCart_dark : s.numCart}>
                  {stateCart ? stateCart : 0}
                </div>
              </h5>
            </li>
          </>
        )}
      </ul>
      <div
        id="toggle"
        className={darkMode ? s.toggle_dark : s.toggle}
        onClick={navSlide}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
