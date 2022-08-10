import React, { useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import s from "../styles/UserProfile.module.css";
import Administration from "../HomeComponents/Administration";

export default function UserManagement () {
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
            <div className={s.infoContainer}>
              <h1 className={s.title}>User Management</h1>
              <Administration/>
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