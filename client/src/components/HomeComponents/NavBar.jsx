import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import logo from "../styles/logo2.png";
import shoppingCart from "../styles/shopping-cart.png";
import { logOut } from "../scripts/auth";
import { CartContext } from "../CartComponents/CartContext";
import { Alert, dividerClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ImageAvatars from "../avatar";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { toast } from "react-toastify";
import { currentUser } from "../../redux/actions";

export default function NavBar() {
  const { products } = useContext(CartContext);

  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useHistory();
  const [stateCart, setStateCart] = useState(products.length);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  //console.log(Object.keys(user).length)

  useEffect(() => {
    setStateCart(products.length);
  }, [products]);

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

  return (
    <nav>
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      <ul className={s.navUl}>
        {user.length && user[0].superAdmin ? (
          <>
            <li id="catalog">
              <Link className={s.navLink} to="/catalog">
                Catalog
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
              <Link className={s.navLink} to="/catalog">
                Catalog
              </Link>
            </li>
            <li>
              <button id="addAirline">
                <Link to="/register/airline">Add your airline</Link>
              </button>
            </li>
            <li>
              <a id="myProfile">
                <Link to="/profile">
                  <ImageAvatars></ImageAvatars>
                </Link>
              </a>
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

            <li>
              <a id="myProfile">
                <Link to="/profile">
                  <ImageAvatars></ImageAvatars>
                </Link>
              </a>
            </li>
            <li id="carrito" className={s.cart_container}>
              <Link className={s.navLink} to="/cart">
                <img className={s.cart} src={shoppingCart} />
              </Link>
            </li>
            <h5 id="nCarrito" className={s.price}>
              <div className={s.numCart}>{stateCart ? stateCart : 0}</div>
            </h5>
          </>
        ) : (
          <>
            <li id="offers">
              <Box sx={{ color: "action.active" }}>
                <Link className={s.navLink} to="/offers">
                  <Badge color="secondary" badgeContent={5}>
                    <LoyaltyIcon />
                    Offers
                  </Badge>
                </Link>
              </Box>
            </li>{" "}
            {/*guest */}
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
            <li id="carrito" className={s.cart_container}>
              <Link className={s.navLink} to="/cart">
                <img className={s.cart} src={shoppingCart} />
              </Link>
            </li>
            <h5 id="nCarrito" className={s.price}>
              {stateCart ? stateCart : 0}
            </h5>
          </>
        )}
      </ul>
    </nav>
  );
}
