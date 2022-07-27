import React from "react";
import { Link } from "react-router-dom";

export default function UserProfile () {
    console.log("LLEGUE")
    return (
        <div style={{marginTop:10+"rem"}}>
            <h2 Link to="/">Scheduled Flights</h2>
            <h1>image</h1>
            <h1>email</h1>
            <h3>First name:</h3> 
            <h3>Last name:</h3>
            {/* <h3>Date of Birth:</h3> */}
            <h3>Phone:</h3>
            <h3>Origin country:</h3>
            <h3>Language(s):</h3>
        </div>
    )
}