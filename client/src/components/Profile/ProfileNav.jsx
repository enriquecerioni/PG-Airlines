import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";
import s from "../styles/UserProfile.module.css";
import defaultProfilePic from "../styles/defaultProfilePic.png";

export default function ProfileNav() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];

  var currentlyUsingPic =
    currentUser.image === null ? defaultProfilePic : currentUser.image;

  var AccInfo = (
    <li id="AccInfo">
      <Link className={s.link} to="/profile">
        <span className={s.span}>Account Information</span>
      </Link>
    </li>
  );

  var TicketsBought = (
    <li id="TicketsBought">
      <Link
        className={s.link}
        to="/purchases" /*PODER DEJAR REVIEW A LA EMPRESA*/
      >
        <span className={s.span}>My Scheduled Flights</span>
      </Link>
    </li>
  );

  var MyAirline = (
    <li id="MyAirline">
      <Link className={s.link} to="/airlineProfile">
        <span className={s.span}>Manage Airline</span>
      </Link>
    </li>
  );

  var OwnFlights = (
    <li id="OwnFlights">
      {/* <Link className={s.link} to="/catalogProfile"> */}
      <Link className={s.link} to="/catalog">
        <span className={s.span}>Manage Airline Flights</span>
      </Link>
    </li>
  );

  console.log(users);
  console.log(currentUser.image);
  return (
    <>
      {currentUser !== undefined ? (
        <aside>
          <figure className={s.imgProfile}>
            <figcaption className={s.fig1}>Welcome</figcaption>
            <figcaption className={s.fig2}>{currentUser.name}</figcaption>
            <img
              className={s.imgProfile}
              // "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
              src={currentlyUsingPic}
              alt="profile"
            />
          </figure>
          <div className={s.divLi}>
            {currentUser.superAdmin ? (
              <ul>
                {AccInfo}                
                {/* Manage Users  SUPER ADMIN ONLY Page manage users  */}
                <li id="ManageUsers" >
                  <Link className={s.link} to="/userManagement">
                    <span className={s.span}>Manage Users</span>
                  </Link>
                </li>
                {/* Manage Airlines  SUPER ADMIN ONLY Page manage users  */}                
                <li id="ManageAirlines" > 
                  <Link className={s.link} to="/airlinesManagement">
                    <span className={s.span}>Manage Airlines</span>
                  </Link>
                </li>
              </ul>
            ) : currentUser.permissions ? (
              <ul>
                {AccInfo}
                {/* {TicketsBought} */}
                {MyAirline} {/*Admin Only Page, manage perfil de Airline*/}
                {/*PODER DEJAR REVIEW A LA EMPRESA*/}
                {OwnFlights} {/*Admin Only Page, donde postear vuelos*/}
              </ul>
            ) : (
              <ul>
                {AccInfo}
                {TicketsBought}
              </ul>
            )}
          </div>
        </aside>
      ) : (
        <aside></aside>
      )}
    </>
  );
}
