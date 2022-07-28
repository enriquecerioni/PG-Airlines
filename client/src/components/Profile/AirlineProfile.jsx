import React from "react";
import ProfileNav from "./ProfileNav";
import { Link } from "react-router-dom";

export default function AirlineProfile () {
    return (
        <div style={{marginTop:15+"rem"}}>
            <ProfileNav/>
            <h2> You haven't registered your airline yet. Want to get started?</h2>
            <button>
                <Link to="/register/airline">
                    Register Airline
                </Link>
            </button>
        </div>
    )
}