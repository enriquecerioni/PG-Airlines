import React from "react";
import ProfileNav from "./ProfileNav";
import s from "../styles/UserPurchases.module.css";

export default function UserPurchases() {
  return (
    <div className={s.container}>
      <ProfileNav />
      <div className={s.infoContainer}>
        <h2 className={s.title}>
          You haven't made any purchases yet. When you purchase an item it will show up here.
        </h2>
      </div>
    </div>
  );
}
