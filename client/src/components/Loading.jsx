import React, { useEffect, useState } from "react";
import s from "./styles/Loading.module.css";
import { useHistory } from "react-router-dom";

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();



  return (
    <div className={s.fondo}>
      <h2 className={s.mensaje}>Loading Info</h2>
      <h3>please wait</h3>
      <div className={s.tainer}>
        <div className={s.load}></div>
        <p className={s.message}>Loading...</p>
      </div>
    </div>
  );
}
