import React, {useContext} from "react";
import s from "../styles/Footer.module.css";
import Logo from "../styles/assets/logo14.png";
// import gitHubLogo from "../styles/github.png";
import { darkModeContext } from "../DarkModeContext";

export default function Footer() {
  const { darkMode } = useContext(darkModeContext)
  return (
    <div className={darkMode ? s.footer_dark : s.footer}>
      <div className={s.leftInfo}>
        <h1 className={s.about}>About Us</h1>
        <p className={s.p}>
          We are a group of students from soyHenry and this is our final
          project. We hope you like it.
        </p>
      </div>

      <div className={s.center}>
        <img className={s.logo} src={Logo} alt="logo" />
      </div>

      <div className={s.rightInfo}>
        <h1 className={s.about}>Contact Us</h1>
        <ul className={s.ul}>
          <li>
            <p className={s.p1}>pg.airlines.ecommerce@gmail.com</p>
          </li>
          <li>
            <i className="bx bxl-github"></i>
            <p className={s.p1}>GitHub</p>
          </li>
          <li>
            <p className={s.p1}>address</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
