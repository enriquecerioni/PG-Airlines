import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/UserProfile.module.css";
import ProfileNav from "./ProfileNav";

export default function UserProfile() {
  console.log("LLEGUE");
  return (
    <div className={s.container}>
      <ProfileNav/>
      {/* <h1>image</h1> */}
      <div className={s.infoContainer}>
        <h1 className={s.title}>Account Information</h1>
        <span className={s.text}>
          Manage your account settings and other information
        </span>
        <div className={s.info}>
          <h1>Profile Information</h1>
          <h4>Email:</h4>
          <h4>First name:</h4>
          <h4>Last name:</h4>
          {/* <h4>Date of Birth:</h4> */}
          <h4>Phone:</h4>
          <h4>Origin country:</h4>
          <h4>Display Language:</h4>
          <h4>Change Password:</h4>
        </div>
      </div>
    </div>
  );
}
