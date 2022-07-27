import React from "react";
import s from "./styles/Loading.module.css";

export default function Loading(){
    return (
        <div className={s.fondo}>
            <h2 className={s.mensaje}>Loading Info</h2>
            <h3>please wait</h3>
            <div className={s.tainer}>
                <div className={s.load}></div>
                <p className={s.message}>Loading...</p>
            </div>
        </div>

    )

}