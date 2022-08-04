
import React, { useEffect, /*useState*/ } from 'react'
import s from "../styles/Catalog.module.css";
import st from '../styles/Forms.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createFlights } from '../../redux/actions/index'
import { useDispatch } from 'react-redux';
// import  TextField  from '@mui/material/TextField';

const style = {

    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
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
                            <div><label>Flight: </label>
                                <input
                                    type='text'
                                    label='ID Flight'
                                    placeholder='Flight'
                                    name='flight'
                                    id="flight"
                                />
                            </div>
                            <div>
                                {/* <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Airline"
                                    defaultValue="Arline"
                                /> */}
                                <label>Airline: </label>
                                <input
                                    name='airline'
                                    type="text"
                                    label='Airline'
                                    placeholder='Airline'
                                    id="airline"
                                />
                            </div>
                            <div><label>Logo: </label>
                                <input
                                    name='logo'
                                    type="text"
                                    label='Logo'
                                    placeholder='Image'
                                    id="logo"
                                />
                            </div>
                            <div><label>Price: </label>
                                <input
                                    name='price'
                                    type="number"
                                    label='Price'
                                    placeholder='Price'
                                    id="price"
                                />
                            </div>
                            <div><label>Stock: </label>
                                <input
                                    name='stock'
                                    type="number"
                                    label='Stock'
                                    placeholder='Stock'
                                    id="stock"
                                />
                            </div>
                            <div><label>Origin: </label>
                                <input
                                    name='origin'
                                    type="text"
                                    label='Origin'
                                    placeholder='Origin'
                                    id="origin"
                                />
                            </div>
                            <div><label>Duration: </label>
                                <input
                                    name='duration'
                                    type="text"
                                    label='Duration'
                                    placeholder='Duration'
                                    id="duration"
                                />
                            </div>
                            <div><label>Departure Hour: </label>
                                <input
                                    name='depH'
                                    type="text"
                                    label='DepH'
                                    placeholder='DepH'
                                    id="depH"
                                />
                            </div>
                            <div><label>Arrival Hour: </label>
                                <input
                                    name='arrH'
                                    type="text"
                                    label='ArrH'
                                    placeholder='ArrH'
                                    id="arrH"
                                />
                            </div>
                            <div><label>Destination: </label>
                                <input
                                    name='destination'
                                    type="text"
                                    label='Destination'
                                    placeholder='Destination'
                                    id="destination"
                                />
                            </div>
                            <div><label>Departure Date: </label>
                                <input
                                    name='depD'
                                    type="text"
                                    label='DepD'
                                    placeholder='DepD'
                                    id="depD"
                                />
                            </div>
                            <div><label>Arrival Date: </label>
                                <input
                                    name='arrD'
                                    type="text"
                                    label='ArrD'
                                    placeholder='ArrD'
                                    id="arrD"
                                />
                            </div>
                            <div><label>Description: </label>
                                <input
                                    name='description'
                                    type="text"
                                    label='Description'
                                    placeholder='Description'
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