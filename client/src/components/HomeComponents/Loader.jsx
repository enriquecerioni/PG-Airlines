import React from "react";
import './Loader.css'

export default function loader(){
   
    return (
        <div className="fondo">
            <h2 className="mensaje">We're preparing your flights</h2>
            <h3>Please Wait</h3>
            <div className="tainer"> 
                <div className="load"></div>
                <p className="message">Loading...</p>
            </div>
        </div>
            
    )

}