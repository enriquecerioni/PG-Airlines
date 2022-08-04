import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from "../styles/Catalog.module.css";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CatalogFlights from './CatalogFlights';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getAllFlights, getAllUsers } from '../../redux/actions/index';
import ModalAdd from './ModalAdd'
import Loader from '../HomeComponents/Loader'

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function Catalog() {
    const dispatch = useDispatch();
    const [airlineFlights,setAirlineFlights]=useState(false)


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllFlights())
        setAirlineFlights(true)
    }, [dispatch,airlineFlights]);

    const currentUser = useSelector((state)=>state.currentUser)
    const Flights = useSelector((state) => state.flights)
    let currentFlights=Flights?.filter((f)=>f.airlineId===currentUser[0]?.id)






    const allFlights = currentFlights?.map((f) => {
        console.log(f);
        return {
            id: f.id,
            airline: currentUser[0]?.name,
            logo: f.logo,
            price: f.price,
            stock: f.tickets,
            origin: f.origin,
            durationEstimated: f.durationEstimated,
            departureHour: f.departureHour,
            arrivalHour: f.arrivalHour,
            destination: f.destination,
            departureDate: f.departureDate,
            arrivalDate: f.arrivalDate,
            description: f.description
        }
    })
    //console.log(allFlights);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
if(currentUser[0] && airlineFlights ){
    return (
        <div className={style.catalog_containers}>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab icon={<FlightTakeoffIcon />} label="Flights" {...a11yProps(0)} />
                    <Tab icon={<LoyaltyIcon />} label='Offers' {...a11yProps(1)} />

                </Tabs>
                <TabPanel className={style.tab} value={value} index={0} >
                    <h1>{currentUser[0]?.name} Flights</h1>
                    
                    {airlineFlights ?
                        <CatalogFlights
                        rows={allFlights && allFlights } setAirlineFlights={setAirlineFlights} airlineFlights={airlineFlights}/>
                        : <h2>no hay vuelos cumpa</h2>
                        }
                    
                    <div id="btnAddAL">
                        <ModalAdd setAirlineFlights={setAirlineFlights}/>

                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Offers
                </TabPanel>
            </Box>
        </div>
    )
    ;}else{
      return(
        <Loader/>
      ) 
    }
}

export default Catalog