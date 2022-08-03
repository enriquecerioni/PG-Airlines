import React from "react";
import s from '../styles/Loader.module.css'

export default function loader(){
   
    return (
        <div className={s.fondo}>
            <h2 className={s.mensaje}>We're preparing your flights</h2>
            <h3>Please Wait</h3>
            <div className={s.tainer}> 
                <div className={s.load}></div>
                <p className={s.message}>Loading...</p>
            </div>
        </div>
            
    )

}