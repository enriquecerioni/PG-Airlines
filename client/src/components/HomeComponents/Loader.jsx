import React from "react";
import './Loader.css'

export default function loader(){
   
    return (
        <div className="fondo">
            <h2 className="mensaje">We are cooking the best recipes</h2>
            <h3>please wait</h3>
            <div className="tainer">
                <div className="load"></div>
                <p className="message">Loading...</p>
            </div>
        </div>
            
    )

}