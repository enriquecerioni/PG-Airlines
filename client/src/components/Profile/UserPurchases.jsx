import React from "react";
import ProfileNav from "./ProfileNav";
import s from "../styles/UserPurchases.module.css";
import Orders from "../CartComponents/Orders";

export default function UserPurchases() {
  return (
    <div className={s.container}>
      <ProfileNav />
      <div className={s.infoContainer}>
        <h2 className={s.title}>
         
          <Orders/>
        </h2>
      </div>
    </div>
  );
}
