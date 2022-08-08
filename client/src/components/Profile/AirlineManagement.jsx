import React, { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline, } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";

import { Delete } from "../scripts/auth";

export default function AirlineManagement() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin
  );
  const business = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && user.empresa
  );

  const [refreshAccounts, setRefreshAccounts] = useState(0);

  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);

  async function deleteUser(UID, email) {
    await Delete(email, UID);
    business.filter((b) => b.email === email).length
      ? dispatch(deleteAirline(email))
      : console.log("no esta");
    //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllUsersFirebase());
    setInterval(() => {}, 1000);
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);

  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container}>
          <ProfileNav />
          <div className={s.infoContainer}>
            <h1 className={s.title}>Airline Management</h1>
            {business.length ? (
        business.map((u) => {
          return (
            <div>
              <br />
              <br />
              <div key={u.uid}>
                email: {u.email},Name: {u.name ? u.name : null}, uid: {u.uid}
              </div>
            </div>
          );
        })
      ) : (
        <h1>No airlines?</h1>
      )}
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
