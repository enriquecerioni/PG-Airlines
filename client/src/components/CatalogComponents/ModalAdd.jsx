
import React, { useEffect, useState } from 'react'
import s from "../styles/Catalog.module.css";
import st from '../styles/Forms.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
                <Box sx={style} className={st.container}>
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Flight 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className={st.form_container}>
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
                            <input
                                state={duration}
                                setState={setDuration}
                                name='duration'
                                type="text"
                                label='Duration'
                                placeholder='Duration'
                                // error='...'
                                // regularExpression={}
                            />
                            <input
                                state={depH}
                                setState={setDepH}
                                name='depH'
                                type="text"
                                label='DepH'
                                placeholder='DepH'
                                // error='...'
                                // regularExpression={}
                            />
                            <input
                                state={arrH}
                                setState={setArrH}
                                name='arrH'
                                type="text"
                                label='ArrH'
                                placeholder='ArrH'
                                // error='...'
                                // regularExpression={}
                            />
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
                            <input
                                state={depD}
                                setState={setDepD}
                                name='depD'
                                type="text"
                                label='DepD'
                                placeholder='DepD'
                                // error='...'
                                // regularExpression={}
                            />
                            <input
                                state={arrD}
                                setState={setArrD}
                                name='arrD'
                                type="text"
                                label='ArrD'
                                placeholder='ArrD'
                                // error='...'
                                // regularExpression={}
                            />
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