import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAirlines, getAllFlights, getAllUsersFirebase } from "../../redux/actions";

export default function Business(){
    const dispatch=useDispatch()
    const allAirlines=useSelector(state=>state.airlines)
    const allFlights= useSelector(state=>state.flights)
   
   useEffect(()=>{
        dispatch(getAllAirlines())
        dispatch(getAllFlights())
   },[])
                                                                //FUNCIONA SOLO CON LOS DATOS DEL POSTGRES
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {
                allAirlines.length ? allAirlines.map((b)=>{
                    return (
                        <div>
                            <h2>Empresa: {b.name}</h2>
                            {
                                allFlights.length ? allFlights.map((f)=>{
                                    return (
                                        <div>
                                           {
                                                f.airlineId===b.id ? 
                                                    <div>
                                                        airline: {b.name},
                                                            logo: {f.logo},
                                                            price: {f.price},
                                                            stock: {f.tickets},
                                                            origin: {f.origin},
                                                            durationEstimated: {f.durationEstimated},
                                                            departureHour: {f.departureHour},
                                                            arrivalHour: {f.arrivalHour},
                                                            destination: {f.destination},
                                                            departureDate: {f.departureDate},
                                                            arrivalDate: {f.arrivalDate},
                                                        
                                                    </div>

                                            : (null
                                            )
                                        }
                
                                        </div>
                                    )
                                }) : (
                                    <p>no hay vuelos cargados de la empresa</p>
                                )
                            }
                        </div>
                    )



                }) : (
                    <p>No se encuentran empresas registradas</p>
                )
            }

        </div>
    )
}

    
