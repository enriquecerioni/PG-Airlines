import React, { useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";

import Catalog from "../CatalogComponents/Catalog";

export default function FlightManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    setInterval(() => {}, 1000);
  }, [dispatch]);
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);
  console.log("LLEGUE");
  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container}>
          <ProfileNav />
          <div className={s.infoContainer}>
            <h2 className={s.title}>
              <Catalog/>
            </h2>
          </div>
        </div>
      ) : (
        <h1>{<Loader />}</h1>
      )}
    </>
  );
}