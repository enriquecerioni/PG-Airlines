
import React, { useEffect, /*useState*/ } from 'react'
import s from "../styles/Catalog.module.css";
import st from '../styles/Forms.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createFlights, getAllAirlines, getAllFlights, getAllUsers } from '../../redux/actions/index'
import { useDispatch, useSelector, } from 'react-redux';
import TextField from '@mui/material/TextField';
import CountriesList from './CountriesList';
import Stack from '@mui/material/Stack';
import TimeDate from './TimeDate'
import TimeHour from './TimeHour';

const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    "inp": {
        width: 260,
        marginTop: 1.5,
        marginLeft: 2,
        marginRight: 0,
        marginButton: 0,
    }
};




export default function AddModal({ setAirlineFlights }) {

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAdd = (e) => {
        debugger
        e.preventDefault();

        const data = value
        const dataNew = {


            id: currentUser[0]?.id,
            airline: currentUser[0]?.name,
            // arrivalDate: document.getElementById('arrD').value,
            // arrivalHour: document.getElementById('arrH').value,
            // departureDate: document.getElementById('depD').value,
            // departureHour: document.getElementById('depH').value,
            // description: document.getElementById('description').value,
            // destination: document.getElementById('destination').value,
            // durationEstimated: document.getElementById('duration').value,
            // logo: document.getElementById('logo').value,
            // origin: document.getElementById('origin').value,
            // price: document.getElementById('price').value,
            stock: document.getElementById('stock').value
            // flight: document.getElementById('flight').value,
        }
        console.log(dataNew);
        //        dispatch(createFlights(dataNew));
        //        setAirlineFlights(false)
        //      window.location.reload()
    }
    const realTime = Date.now();
    const [value, setValue] = React.useState(new Date(realTime));
    
const handleChange = (newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        setOpen();
        // dispatch(getAllUsers())
        // dispatch(getAllAirlines())
        // dispatch(getAllFlights())
    }, [dispatch])

    return (
        <div>
            <button className={s.btn} onClick={handleOpen}>Add</button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} className={st.container} variant="scrollable">
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Flight
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form >
                            <Stack spacing={.8}>
                                {/* <div>
                                {/* <label>Flight: </label> 
                                <TextField sx={style.inp}
                                    type='text'
                                    // label='ID Flight'
                                    placeholder='Flight'
                                    name='flight'
                                    id="flight" 
                                    variant="standard"
                                />
                            </div> */}
                                <div>
                                    {/* <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Airline"
                                    defaultValue="Arline"
                            /> */}
                                    <label>Airline: {currentUser[0]?.name} </label>
                                </div>
                                <div>
                                    <label>Logo: </label>
                                    <input
                                        name='logo'
                                        type="file"
                                        // label='Logo'
                                        placeholder='Image'
                                        id="logo"
                                        variant="standard"
                                    />
                                </div>
                                <div>
                                    {/* <label>Price: </label> */}
                                    <TextField sx={style.inp}
                                        name='price'
                                        type="number"
                                        // label='Price'
                                        placeholder='Price'
                                        id="price"
                                        variant="standard"
                                    />
                                </div>
                                <div>
                                    {/* <label>Stock: </label> */}
                                    <TextField sx={style.inp}
                                        name='stock'
                                        type="number"
                                        // label='Stock'
                                        placeholder='Stock'
                                        id="stock"
                                        variant="standard"
                                    />
                                </div>
                                <div>
                                    <CountriesList
                                        label={"Origin"}
                                        id="origin" />
                                </div>
                                <div>
                                    <CountriesList
                                        label={"Destination"}
                                        id="destination" />
                                </div>
                                <div>
                                    {/* <label>Duration: </label> */}
                                    <TextField sx={style.inp}
                                        name='duration'
                                        type="text"
                                        // label='Duration'
                                        placeholder='Duration'
                                        id="duration"
                                        variant="standard"
                                    />
                                </div>
                                <div>
                                    <TimeDate
                                        label={"Departure Date"}
                                        id="depD" 
                                        handleChange = {handleChange}
                                        value = {value}/>
                                </div>
                                <div>
                                    <TimeHour
                                        label={"Departure Hour"}
                                        id="depH" />
                                </div>
                                <div>
                                    <TimeDate
                                        label={"Arrival Date"}
                                        id="arrD" 
                                        handleChange = {handleChange}
                                        value = {value}/>
                                </div>
                                <div>
                                    <TimeHour
                                        label={"Arrival Hour"}
                                        id="arrH" />
                                </div>
                                <div>
                                    {/* <label>Description: </label> */}
                                    <TextField sx={style.inp}
                                        name='description'
                                        type="text"
                                        // label='Description'
                                        placeholder='Description'
                                        variant="standard"
                                        id="description"
                                    />
                                </div>
                                <div>
                                    <button className={s.btn} type='submit' variant="contained" onClick={(e) => handleAdd(e)}>Add Flight</button>
                                    <button className={s.btn} onClick={handleClose}>Cancel</button>
                                </div>
                            </Stack>
                        </form>
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
}