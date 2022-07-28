import React from "react";
import ProfileNav from "./ProfileNav";

export default function UserPurchases () {
    return (
        <div style={{marginTop:10+"rem"}}>
            <ProfileNav/>
            <h2> You haven't made any purchases yet. When you purchase an item it will show up here. </h2>
        </div>
        
    )
}