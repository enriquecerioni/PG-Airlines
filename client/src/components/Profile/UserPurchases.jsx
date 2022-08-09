import React, { useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";
import Orders from "../CartComponents/Orders";

export default function UserPurchases() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllUsers());
  //   setInterval(() => {}, 1000);
  // }, []);
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  // console.log(users);
  // console.log(currentUser);
  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container}>
          <ProfileNav />
          <div className={s.infoContainer}>
            <h2 className={s.title}>
              <Orders />
            </h2>
          </div>
        </div>
      ) : (
        <h1>{<Loader />}</h1>
      )}
    </>
  );
}
