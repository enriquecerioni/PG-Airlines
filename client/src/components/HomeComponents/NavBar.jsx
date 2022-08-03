import React, { useContext, useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import s from "../styles/NavBar.module.css";
import logo from "../styles/logo2.png";
import shoppingCart from "../styles/shopping-cart.png";
import { logOut } from "../scripts/auth";
import { CartContext } from "../CartComponents/CartContext";
// import { Alert, dividerClasses } from "@mui/material";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ImageAvatars from "../avatar";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { toast } from "react-toastify";
// import { currentUser } from "../../redux/actions";

import { Switch, FormGroup, FormControlLabel, styled, Typography, Stack  } from '@mui/material'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function NavBar() {
  const { products } = useContext(CartContext);

  // const [alert, setAlert] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);
  const navigate = useHistory();
  const [stateCart, setStateCart] = useState(products.length);
  const user = useSelector((state) => state.currentUser);
  // const dispatch = useDispatch();
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
      {/* <Link className={s.navLink} to="/catalog">
                Catalog
              </Link> */}
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      {/* LIGHT/NIGHT MODE SETUP */}

      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Light Mode</Typography> 
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          />  
          <Typography>Dark Mode</Typography>         
        </Stack>
      </FormGroup>


      {/* LIGHT/NIGHT MODE SETUP */}
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
              {/* <a id="myProfile"> */}
                <Link to="/profile">
                  <ImageAvatars></ImageAvatars>
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
              {/* <a id="myProfile"> */}
                <Link to="/profile">
                  <ImageAvatars></ImageAvatars>
                </Link>
              {/* </a> */}
            </li>
            <li id="carrito" className={s.cart_container}>
              <Link className={s.navLink} to="/cart">
                <img className={s.cart} alt="#" src={shoppingCart} />
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
                <img className={s.cart} alt="#" src={shoppingCart} />
              </Link>
            </li>
            <h5 id="nCarrito" className={s.price}>
              <div className={s.numCart}>{stateCart ? stateCart : 0}</div>
            </h5>
          </>
        )}
      </ul>
    </nav>
  );
}
