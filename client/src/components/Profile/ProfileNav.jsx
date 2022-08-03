import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";
import s from "../styles/ProfileNav.module.css";
import defaultProfilePic from "../styles/defaultProfilePic.png";

export default function ProfileNav() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function isImage(anImage) {
    return /.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(anImage);
  }

  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];

  var currentlyUsingPic = defaultProfilePic;
  // currentUser.image === null ? defaultProfilePic : isImage(currentUser.image) ? currentUser.image : defaultProfilePic

  var AccInfo = (
    <li className={s.navLink}>
      <Link className={s.links} to="/profile">
        <i className="bx bx-home-alt icon"></i>
        <span className={s.text}>Account Information</span>
      </Link>
    </li>
  );

  var TicketsBought = (
    <li className={s.navLink}>
      <Link className={s.links} to="/purchases">
        <i className="bx bx-bar-chart-alt-2 icon"></i>
        <span className={s.text}>My Orders </span>
      </Link>
    </li>
  );

  var MyAirline = (
    <li className={s.navLink}>
      <Link className={s.links} to="/airlineProfile">
        <i className="bx bx-bell icon"></i>
        <span className={s.text}>Manage Airline</span>
      </Link>
    </li>
  );

  var OwnFlights = (
    <li className={s.navLink}>
      <Link className={s.links} to="/catalog">
        <i className="bx bx-pie-chart-alt icon"></i>
        <span className={s.text}>Manage Airline Flights</span>
      </Link>
    </li>
  );

  var UserManagement = (
    <li className={s.navLink}>
      <Link className={s.links} to="/userManagement">
        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
        <span className={s.text}>User Management</span>
      </Link>
    </li>
  );

  var AirlineManagement = (
    <li className={s.navLink}>
      <Link className={s.links} to="/airlineManagement">
        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
        <span className={s.text}>Airline Management</span>
      </Link>
    </li>
  );

  var AirlinePendingRequests = (
    <li className={s.navLink}>
      <Link className={s.links} to="/airlinePendingRequests">
        {/* <i className='bx bx-pie-chart-alt icon' ></i> */}
        <span className={s.text}>AirlinePendingRequests</span>
      </Link>
    </li>
  );

  console.log(users);
  return (
    <>
      {currentUser !== undefined ? (
        <aside className={s.sidebar}>
          <header>
            <div className={s.imageText}>
              <span className={s.image}>
                {/* <img src="logo.png" alt=""> */}
              </span>

              <div className={s.text}>
                <figure id="img-profile">
                  <figcaption className={s.fig1}>Welcome</figcaption>
                  <figcaption className={s.fig2}>{currentUser.name}</figcaption>
                  <img
                    className={s.imgProfile}
                    // "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                    src={currentlyUsingPic}
                    alt="profile"
                  />
                </figure>
              </div>
            </div>
            <div className={s.arrow}>
              <i className={s.toggle}></i>
            </div>
          </header>
          <div className={s.menuBar}>
            <div className={s.menu}>
              {currentUser.superAdmin ? (
                <ul className={s.menuLinks}>
                  {AccInfo}
                  {UserManagement}
                  {AirlineManagement}
                  {AirlinePendingRequests}
                </ul>
              ) : currentUser.permissions ? (
                <ul className={s.menuLinks}>
                  {AccInfo}
                  {MyAirline}
                  {OwnFlights}
                </ul>
              ) : (
                <ul className={s.menuLinks}>
                  {AccInfo}
                  {TicketsBought}
                </ul>
              )}
            </div>
            <div className={s.bottomContent}>
              <li className={s.navLink}>
                <Link className={s.links} to="/logout">
                  <i className="bx bx-log-out icon"></i>
                  <span className={s.text}>Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </aside>
      ) : (
        <aside className={s.sidebar}></aside>
      )}
    </>
  );
}
