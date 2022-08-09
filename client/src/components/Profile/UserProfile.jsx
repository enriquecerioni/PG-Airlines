import React, { useContext, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, resetPassword } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import {darkModeContext} from "../DarkModeContext"
import s from "../styles/UserProfile.module.css";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { darkMode } = useContext(darkModeContext)

  useEffect(() => {
    dispatch(getAllUsers());
    // setInterval(() => {}, 1000);
  }, []);

  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);

  function executeButton () {
    dispatch(resetPassword(currentUser.email))
  }

  return (
    <>
      {currentUser !== undefined ? (
        <div className={darkMode ? s.container_dark : s.container}>
          <ProfileNav />
          {/* <h1>image</h1> */}
          <div className={s.infoContainer}>
            <h1 className={ darkMode ? s.title_dark : s.title}>Account Information</h1>
            <span className={  darkMode ? s.text_dark : s.text}>
              Manage your account settings and other information
            </span>
            <div className={s.info}>
              <h1>Profile Information</h1>
              <h4 className={s.h4}>Email: {currentUser.email}</h4>
              <h4 className={s.h4}>Full name: {currentUser.name} </h4>
              {/* <h4>First name:</h4> */}
              {/* <h4>Last name:</h4> */}
              {/* <h4>Date of Birth:</h4> */}
              <h4 className={s.h4}>
                Phone: {currentUser.phone === null ? null : currentUser.phone}
              </h4>
              {/* To display flights matching origin country first */}
              <h4 className={s.h4}>Origin country:</h4>              
              <h4 className={s.h4}>Display Language:</h4>
              <h4 className={s.h4}>Change Password:<button onClick={() => {executeButton()}}>Change Password</button></h4>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>{<Loader />}</h1>
        </div>
      )}
    </>
  );
}
