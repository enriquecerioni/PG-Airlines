import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNav () {
    return (
        <nav style={{marginTop:5+"rem"}}>
            <ul>
                <li id="AccInfo">
                    <Link to="/profile" >
                        Account Information
                    </Link>
                </li>
                <li id="TicketsBought"> 
                    <Link to="/purchases" /*PODER DEJAR REVIEW A LA EMPRESA*/>
                        My Scheduled Flights 
                    </Link>
                </li>
                <li id="MyAirline" /*Admin Only page, manage perfil de Airline*/>
                    Manage Airline
                </li>
                <li id="OwnFlights" /*Admin Only page, donde postear vuelos*/> 
                    Manage Airline Flights
                </li>
                {/* <li id="ManageUsers" /* SUPER ADMIN ONLY Page manage users > */}
                    {/* Manage Users */}
                {/* </li> */}
                {/* <li id="ManageAirlines" /* SUPER ADMIN ONLY Page manage users > */}
                    {/* Manage Airlines */}
                {/* </li> */}
            </ul>
        </nav>
    )
}