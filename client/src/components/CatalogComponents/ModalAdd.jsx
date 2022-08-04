
import React, { useEffect, /*useState*/ } from 'react'
import s from "../styles/Catalog.module.css";
import st from '../styles/Forms.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createFlights } from '../../redux/actions/index'
import { useDispatch } from 'react-redux';
import  TextField  from '@mui/material/TextField';

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
    "inp":{
        width: 260,
        marginTop: 1.5,
        marginLeft: 2,
        marginRight: 0,
        marginButton: 0,
    }
};






export default function AddModal() {
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAdd = () => {
        const dataNew = {
            airline: document.getElementById('airline').value,
            arrivalDate: document.getElementById('arrD').value,
            arrivalHour: document.getElementById('arrH').value,
            departureDate: document.getElementById('depD').value,
            departureHour: document.getElementById('depH').value,
            description: document.getElementById('description').value,
            destination: document.getElementById('destination').value,
            durationEstimated: document.getElementById('duration').value,
            flight: document.getElementById('flight').value,
            logo: document.getElementById('logo').value,
            origin: document.getElementById('origin').value,
            price: document.getElementById('price').value,
            stock: document.getElementById('stock').value
        }


        dispatch(createFlights(dataNew));
    }



    useEffect(() => {
        setOpen();
    }, [])

    return (
        <div>
            <button className={s.btn} onClick={handleOpen}>Add</button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
            >
                <Box sx={style} className={st.container}>
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Flight
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form >
                            <div>
                                {/* <label>Flight: </label> */}
                                <TextField sx={style.inp}
                                    type='text'
                                    // label='ID Flight'
                                    placeholder='Flight'
                                    name='flight'
                                    id="flight" 
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Airline"
                                    defaultValue="Arline"
                                /> */}
                                {/* <label>Airline: </label> */}
                                <TextField sx={style.inp}
                                    name='airline'
                                    type="text"
                                    // label='Airline'
                                    placeholder='Airline'
                                    id="airline"
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <label>Logo: </label> */}
                                <TextField sx={style.inp}
                                    name='logo'
                                    type="text"
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
                                {/* <label>Origin: </label> */}
                                <TextField sx={style.inp}
                                    name='origin'
                                    type="text"
                                    // label='Origin'
                                    placeholder='Origin'
                                    id="origin"
                                    variant="standard"
                                />
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
                                {/* <label>Departure Hour: </label> */}
                                <TextField sx={style.inp}
                                    name='depH'
                                    type="text"
                                    // label='DepH'
                                    placeholder='Departure Hour'
                                    id="depH"
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <label>Arrival Hour: </label> */}
                                <TextField sx={style.inp}
                                    name='arrH'
                                    type="text"
                                    // label='ArrH'
                                    placeholder='Arrival Hour'
                                    id="arrH"
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <label>Destination: </label> */}
                                <TextField sx={style.inp}
                                    name='destination'
                                    type="text"
                                    // label='Destination'
                                    placeholder='Destination'
                                    id="destination"
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <label>Departure Date: </label> */}
                                <TextField sx={style.inp}
                                    name='depD'
                                    type="text"
                                    // label='DepD'
                                    placeholder='Departure Date'
                                    id="depD"
                                    variant="standard"
                                />
                            </div>
                            <div>
                                {/* <label>Arrival Date: </label> */}
                                <TextField sx={style.inp}
                                    name='arrD'
                                    type="text"
                                    // label='ArrD'
                                    placeholder='Arrival Date'
                                    id="arrD"
                                    variant="standard"
                                />
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
                                <button className={s.btn} type='submit' variant="contained" onClick={handleAdd}>Add Flight</button>
                                <button className={s.btn} onClick={handleClose}>Cancel</button>
                            </div>

                        </form>
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
}