import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from '../styles/NavBar.module.css';
import logo from '../styles/logo.png';
import shoppingCart from '../styles/shopping-cart.png';
import { logOut } from '../scripts/auth';
import { CartContext } from '../CartComponents/CartContext';

export default  function NavBar() {

  const { products } = useContext(CartContext);

  const [stateCart, setStateCart] = useState(products.length);
  
  useEffect(() => {
    setStateCart(products.length);
    // console.log("Carrito Actualizado.");
  }, [products]);


  return (
    <nav >
      <Link className={s.navImg} to="/">
        <img className={s.logoImg} src={logo} alt="logo" />
      </Link>
      <ul className={s.navUl}>
        <li>
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
        <li>
          <button id="logOut" className={s.navLink_logout} onClick={()=>logOut()}>Log Out</button>
        </li>
        <li className={s.cart_container}>
          <Link className={s.navLink} to="/cart"  >
            <img className={s.cart} src={shoppingCart}/>
          </Link>
          </li>
          <h5 className={s.price}>{stateCart}</h5>
      </ul>
    </nav> 
  );
}

/*
    {cartOpen ? (
      <div className={s.cartOpen}>
        <BoxCart onClick={handleCart} />
      </div>
    ) : (
      <></>
    )}
*/
