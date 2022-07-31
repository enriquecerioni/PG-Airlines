
import React, { useEffect, useState } from 'react'
import s from "../styles/Catalog.module.css";
//import st from '../styles/Forms.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5
};

export default function AddModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [validForm, setValidForm] = useState(null);
    const [flight, setFlight] = useState({ value: '', valid: null });
    const [airline, setAirline] = useState({ value: '', valid: null });
    const [logo, setLogo] = useState({ value: '', valid: null });
    const [price, setPrice] = useState({ value: '', valid: null });
    const [stock, setStock] = useState({ value: '', valid: null });
    const [origin, setOrigin] = useState({ value: '', valid: null });
    const [duration, setDuration] = useState({ value: '', valid: null });
    const [depH, setDepH] = useState({ value: '', valid: null });
    const [arrH, setArrH] = useState({ value: '', valid: null });
    const [destination, setDestination] = useState({ value: '', valid: null });
    const [depD, setDepD] = useState({ value: '', valid: null });
    const [arrD, setArrD] = useState({ value: '', valid: null });
    const [description, setDescription] = useState({ value: '', valid: null });

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
            >
                <Box sx={style} >
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight='bold'>
                        Add new Flight
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className={s.form}>
                            <div><label>Flight: </label>
                                <input
                                    state={flight}
                                    setState={setFlight}
                                    type='text'
                                    label='ID Flight'
                                    placeholder='Flight'
                                    name='flight'
                                //error='...'
                                //regularExpression={}
                                />
                            </div>
                            <div><label>Airline: </label>
                                <input
                                    state={airline}
                                    setState={setAirline}
                                    name='airline'
                                    type="text"
                                    label='Airline'
                                    placeholder='Airline'
                                //error='...'
                                //regularExpression={}
                                />
                            </div>
                            <div><label>Logo: </label>
                                <input
                                    state={logo}
                                    setState={setLogo}
                                    name='logo'
                                    type="text"
                                    label='Logo'
                                    placeholder='Image'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Price: </label>
                                <input
                                    state={price}
                                    setState={setPrice}
                                    name='price'
                                    type="number"
                                    label='Price'
                                    placeholder='Price'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Stock: </label>
                                <input
                                    state={stock}
                                    setState={setStock}
                                    name='stock'
                                    type="number"
                                    label='Stock'
                                    placeholder='Stock'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Origin: </label>
                                <input
                                    state={origin}
                                    setState={setOrigin}
                                    name='origin'
                                    type="text"
                                    label='Origin'
                                    placeholder='Origin'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Duration: </label>
                                <input
                                    state={duration}
                                    setState={setDuration}
                                    name='duration'
                                    type="text"
                                    label='Duration'
                                    placeholder='Duration Estimated'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Departure Hour: </label>
                                <input
                                    state={depH}
                                    setState={setDepH}
                                    name='depH'
                                    type="text"
                                    label='DepH'
                                    placeholder='Departure Hour'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Arrival Hour: </label>
                                <input
                                    state={arrH}
                                    setState={setArrH}
                                    name='arrH'
                                    type="text"
                                    label='ArrH'
                                    placeholder='Arrival Hour'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Destination: </label>
                                <input
                                    state={destination}
                                    setState={setDestination}
                                    name='destination'
                                    type="text"
                                    label='Destination'
                                    placeholder='Destination'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Departure Date: </label>
                                <input
                                    state={depD}
                                    setState={setDepD}
                                    name='depD'
                                    type="text"
                                    label='DepD'
                                    placeholder='Departure Date'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Arrival Date: </label>
                                <input
                                    state={arrD}
                                    setState={setArrD}
                                    name='arrD'
                                    type="text"
                                    label='ArrD'
                                    placeholder='Arrival Date'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>
                            <div><label>Description: </label>
                                <input
                                    state={description}
                                    setState={setDescription}
                                    name='description'
                                    type="text"
                                    label='Description'
                                    placeholder='Description'
                                // error='...'
                                // regularExpression={}
                                />
                            </div>

                            {validForm === false && <span>Please complete all fields correctly</span>}
                            <div>
                                <button className={s.btn} type='submit' variant="contained">Add Flight</button>
                                <button className={s.btn} onClick={handleClose}>Cancel</button>
                            </div>

                            {validForm === true && <span>Thank you!</span>}

                        </form>
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
}