import React, { useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";
import ProfileNav from "./ProfileNav";

export default function UserProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    setInterval(() => {}, 1000);
  }, [dispatch]);

  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);
  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container}>
          <ProfileNav />
          {/* <h1>image</h1> */}
          <div className={s.infoContainer}>
            <h1 className={s.title}>Account Information</h1>
            <span className={s.text}>
              Manage your account settings and other information
            </span>
            <div className={s.info}>
              <h1>Profile Information</h1>
              <h4>Email: {currentUser.email}</h4>
              <h4>Full name: {currentUser.name} </h4>
              {/* <h4>First name:</h4> */}
              {/* <h4>Last name:</h4> */}
              {/* <h4>Date of Birth:</h4> */}
              <h4>
                Phone: {currentUser.phone === null ? null : currentUser.phone}
              </h4>
              {/* To display flights matching origin country first */}
              <h4>Origin country:</h4>              
              <h4>Display Language:</h4>
              <h4>Change Password:</h4>
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
