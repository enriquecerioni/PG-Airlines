import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import error from "../images/error-404.jpg";
import s from './styles/ErrorPage.module.css'
import { darkModeContext } from './DarkModeContext';

export default function ErrorPage(){

    const { darkMode } = useContext(darkModeContext)

 return (

     <div className={ darkMode ? s.container_dark : s.container}>
         <div>
         <h1 className={ darkMode ? s.h1_dark : s.h1}>Error 404 Page Not Found!</h1>
         <h2 className={s.h2}> There are no Flights or Tickets here ✈</h2>
         </div>
        <div className={s.btnDiv}>
        <Link className={s.links} to="/">
        <button className={ darkMode ? s.btn_dark : s.btn}> Back to home</button>
        </Link>
        </div>
         {/* <img className={s.img} src={error} alt="img not found!" /> */}
     </div>
 )
}