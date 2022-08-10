// import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAirlines, getAllFlights, /*getAllUsersFirebase*/ } from "../../redux/actions";
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material'
import s from "../styles/UserProfile.module.css";

export default function Business(){
    const dispatch=useDispatch()
    const allAirlines=useSelector(state=>state.airlines)
    const allFlights= useSelector(state=>state.flights)
   
   useEffect(()=>{
        dispatch(getAllAirlines())
        dispatch(getAllFlights())
   },[dispatch])
    //FUNCIONA SOLO CON LOS DATOS DEL POSTGRES

    return(
        <div className={s.business_container}>
            {allAirlines.length ? allAirlines.map((b)=>{
                return (
                    <div>
                        <h2>Empresa: {b.name}</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>Airline</strong></TableCell>
                                    <TableCell align="center"><strong>Price</strong></TableCell>
                                    <TableCell align="center"><strong>Stock</strong></TableCell>
                                    <TableCell align="center"><strong>Origin</strong></TableCell>
                                    <TableCell align="center"><strong>Destination</strong></TableCell>
                                    <TableCell align="center"><strong>Duration</strong></TableCell>
                                    <TableCell align="center"><strong>Departure Hour</strong></TableCell>
                                    <TableCell align="center"><strong>Arrival Hour</strong></TableCell>
                                    <TableCell align="center"><strong>Departure Date</strong></TableCell>
                                    <TableCell align="center"><strong>Arrival Date</strong></TableCell>
                                    <TableCell align="center"><strong>Logo</strong></TableCell>
                                </TableRow>
                            </TableHead> 

                            <TableBody>
                                {allFlights.length ? allFlights.map((f)=> {
                                    if(f.airlineId === b.id) 
                                    return (<TableRow className={f.tickets === 0 && s.row_change} key={f.id}>
                                            <TableCell align="center">{b.name}</TableCell>
                                            <TableCell align="center">{f.price}</TableCell>
                                            <TableCell align="center">{f.tickets}</TableCell>
                                            <TableCell align="center">{f.origin}</TableCell> 
                                            {/* ARRIVAL HOUR ES LO MISMO QUE/DESTINATION?*/} 
                                            <TableCell align="center">{f.arrivalHour}</TableCell> 
                                            <TableCell align="center">{f.durationEstimated}</TableCell>
                                            <TableCell align="center">{f.departureHour}</TableCell>
                                            <TableCell align="center">{f.arrivalHour}</TableCell>
                                            <TableCell align="center">{f.departureDate}</TableCell>
                                            <TableCell align="center">{f.arrivalDate}</TableCell>
                                            <TableCell align="center"><img src={f.logo} alt="logo" width='60px' height='60px' /> </TableCell>
                                        </TableRow> 
                                        )                                
                                    }
                                ) : <p>no hay vuelos cargados de la empresa</p>}
                            </TableBody> 
                        </Table>
                    </div>
                )
            })
             : <p>No se encuentran empresas registradas</p>}
        </div>
    )
}