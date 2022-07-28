import React from "react";
import ProfileNav from "./ProfileNav";

export default function UserProfile () {
    console.log("LLEGUE")
    return (
        <div style={{marginTop:15+"rem"}}>            
            <ProfileNav/>
            <h1>image</h1>
            <h1>email</h1>
            <h3>First name:</h3> 
            <h3>Last name:</h3>
            {/* <h3>Date of Birth:</h3> */}
            <h3>Phone:</h3>
            <h3>Origin country:</h3>
            <h3>Display Language:</h3>
            <h3>Change Password:</h3>
        </div>
    )
}