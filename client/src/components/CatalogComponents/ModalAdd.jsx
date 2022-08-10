import React, { useEffect, /*useState*/ } from 'react'
import s from "../styles/Catalog.module.css";
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
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
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
    const [valuesPrice, setValuesPrice] = React.useState({ price: '' });

    const realTime = new Date;
    const [DateDeparture, setValueDep] = React.useState(new Date(realTime));
    const [DateArrival, setValueArriv] = React.useState(new Date(realTime));

    const [dateHour, setHour] = React.useState(new Date(realTime));
    const [dateDepHour, SetDepHour] = React.useState(new Date(realTime));
    const [dateCountriesList, setCountriesList] = React.useState('');
    const [dateCountriesListDest, setCountriesListDest] = React.useState('');
    const [duration, setDuration] = React.useState('');

    const [errOrig, setErrOrig] = React.useState(false)
    const [msgErrOrig, setMsgErrOrig] = React.useState("");
    const [errDest, setErrDest] = React.useState(false)
    const [msgErrDest, setMsgErrDest] = React.useState("");
    const [errDur, setErrDur] = React.useState(false);
    const [msgErrDur, setMsgErrDur] = React.useState("");
    const [errorDate, setErrDate] = React.useState(false);
    const [msgErrDate, setMsgErrDate] = React.useState("");
    const [errorPrice, setErrPrice] = React.useState(false);
    const [msgErrPrice, setMsgErrPrice] = React.useState("");
    const [errorStock, setErrStock] = React.useState(false);
    const [msgErrStock, setMsgErrStock] = React.useState("");
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setValueDep(new Date(realTime));
        setValueArriv(new Date(realTime));
        setHour(new Date(realTime));
        SetDepHour(new Date(realTime));
        setCountriesList('');
        setCountriesListDest('');
        setDuration('');
        setValuesPrice({ price: '' });
        setErrOrig(false);
        setErrDest(false);
        setErrDur(false);
        setErrDate(false);
        setErrPrice(false);
        setErrStock(false);
        setOpen(false)
    };

    const handleChangeTime = (e) => {
        const date = e;
        if (date < DateDeparture) {
            setErrDate(true)
            setMsgErrDate("Date not allowed")
        } else {
            setValueArriv(date);
            setErrDate(false)
            setMsgErrDate("")
        }
    }

    const handleChangeHour = (e) => {
        console.log(e);
        setHour(e);
    }
    const handleChangeDepHour = (e) => {
        console.log(e);
        SetDepHour(e);
    }

    function validation(date){
        if(date == '' ){
          
         return true;
        }else{
            return false;
        }        
    }

    const handleAdd = (e) => {
        e.preventDefault();
        let band = false;
        if(validation(dateCountriesList)){
            setErrOrig(true);
            band=true;
        }         
        if(validation(dateCountriesListDest)){
            setErrDest(true);
            band=true;
        }         
        if(validation(document.getElementById('duration').value)){
            setErrDur(true);
            band=true;
        }         
        if(validation(document.getElementById('stock').value)){
            setErrStock(true);
            band=true;
        }        
        if(validation(valuesPrice.price)){
            setErrPrice(true);
            band=true;
        }
        if(band)
            return

        const dataNew = {
            id: currentUser[0]?.id,
            airline: currentUser[0]?.name,
            arrivalDate: DateArrival.toISOString().slice(0, 10),
            arrivalHour: dateHour.toTimeString().slice(0, 5),
            departureDate: DateDeparture.toISOString().slice(0, 10),//document.getElementById('depD').value,
            departureHour: dateDepHour.toTimeString().slice(0, 5),//document.getElementById('depH').value,
            //description: document.getElementById('description').value,
            destination: dateCountriesListDest,//document.getElementById('destination').value,
            durationEstimated: document.getElementById('duration').value,
            logo: currentUser[0]?.image,
            origin: dateCountriesList,// document.getElementById('origin').value,
            price: valuesPrice.price,//document.getElementById('price').value,
            stock: document.getElementById('stock').value
            // flight: document.getElementById('flight').value,
        }
        console.log(dataNew);
        dispatch(createFlights(dataNew));
        setAirlineFlights(false)
        window.location.reload()
    }
    const handleChangeDepDate = (newValue) => {  
        if (DateDeparture.getDate() == DateArrival.getDate())
            setValueArriv(newValue);
        setValueDep(newValue);
    };

    const handleCountriesListOrig = (e) => {
        const originCountry = e.currentTarget.innerText
        if (originCountry == dateCountriesListDest) {
            setErrOrig(true)
            setMsgErrOrig("Country not allowed")
        } else {
            setCountriesList(originCountry);
            setErrOrig(false)
            setMsgErrOrig("")
        }
        setCountriesList(originCountry);
    }

    const handleCountriesListDest = (e) => {
        const destCountry = e.currentTarget.innerText
        if (destCountry == dateCountriesList) {
            setErrDest(true)
            setMsgErrDest("Country not allowed")
        } else {
            setCountriesListDest(destCountry);
            setErrDest(false)
            setMsgErrDest("")
        }
        setCountriesListDest(destCountry);
    }

    const handleChangeAdo = (prop) => (event) => {
        setErrPrice(validation(event.target.value)); 
        setValuesPrice({ ...valuesPrice, [prop]: event.target.value });
       
    };

    function onChangeDuration(e) {
        let reg = new RegExp("[0-9:]+$")
        let hrs = Array.from(e.target.value.replace(':', ''));
        if (hrs.length == 0) {
            setDuration(e.target.value);
            return
        } else if (reg.test(hrs)) {
            if (hrs.length == 3) {
                setDuration(hrs[0] + hrs[1] + ":" + hrs[2]);
            } else if (hrs.length == 2) {
                setDuration(hrs[0] + hrs[1]);
            }
            else {
                setDuration(e.target.value);
            }
        } else {
            setErrDur(true)
            setMsgErrDur("Indicate de duration estimated, please")
        }
        setErrDur(validation(e.target.value)); 
    }

    function onChangeStock(e) {
        setErrStock(validation(e.target.value));
    }

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
                <Box sx={style} className={s.container} variant="scrollable">
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Flight ✈️
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form >
                                <Stack spacing={1} >
                                    <div className={s.inputCont}>
                                        <div>
                                            <label>Airline: {currentUser[0]?.name} </label>
                                        </div>
                                        <div>                                           
                                             <img  src={currentUser[0]?.image} alt="Img" />                                            
                                        </div>
                                    </div>
                                    <div className={s.inputCont}>
                                        <div >
                                            <CountriesList
                                                label={"Origin"}
                                                id="outlined-origin"
                                                handleCountriesList={handleCountriesListOrig}
                                                error={errOrig}
                                                msgErr={msgErrOrig}
                                            />
                                        </div>
                                        <div >
                                            <CountriesList
                                                label={"Destination"}
                                                id="outlined-destination"
                                                handleCountriesList={handleCountriesListDest}
                                                error={errDest}
                                                msgErr={msgErrDest}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <TextField sx={style.inp}
                                            name='duration'
                                            type="text"
                                            // label='Duration'
                                            label='Duration Estimated'
                                            id="duration"
                                            variant="standard"
                                            value={duration}
                                            onChange={onChangeDuration}
                                            inputProps={{ maxLength: 5 }}
                                            error={errDur}
                                            msgErr={msgErrDur}
                                            required
                                        />
                                    </div>
                                    <div className={s.inputCont}>
                                        <TimeDate
                                            label={"Departure Date"}
                                            id="depD"
                                            handleChangeDate={handleChangeDepDate}
                                            value={DateDeparture}
                                            error={errorDate}
                                            msgErr={msgErrDate}
                                        />
                                        <TimeHour
                                            label={"Departure Hour"}
                                            id="depH"
                                            handleChangeHour={handleChangeDepHour}
                                            value={dateDepHour}
                                        />
                                    </div>
                                    <div className={s.inputCont}>
                                        <TimeDate
                                            label={"Arrival Date"}
                                            id="arrD"
                                            handleChangeDate={handleChangeTime}
                                            value={DateArrival}
                                            error={errorDate}
                                            msgErr={msgErrDate}
                                        />
                                        <TimeHour
                                            label={"Arrival Hour"}
                                            id="arrH"
                                            handleChangeHour={handleChangeHour}
                                            value={dateHour}
                                        />
                                    </div>
                                    <div className={s.inputCont}>
                                        <div>
                                            <FormControl
                                                variant="filled"
                                                required>
                                                <InputLabel htmlFor="filled-adornment">Price</InputLabel>
                                                <FilledInput
                                                    id="filled-adornment"
                                                    value={valuesPrice.price}
                                                    onChange={handleChangeAdo('price')}
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    type="number"
                                                    inputProps={{ min: 1 }}
                                                    error={errorPrice}
                                                    msgError={msgErrPrice}
                                                />
                                            </FormControl>
                                        </div>
                                        <div>
                                            <TextField sx={style.inp}
                                                name='stock'
                                                type="number"
                                                inputProps={{ min: 1 }}
                                                label='Stock'
                                                id="stock"
                                                variant="filled"
                                                error={errorStock}
                                                msgError={msgErrStock}
                                            />
                                        </div>
                                    </div>
                                    {/* <div>
                                        <TextField fullWidth sx={{ m: 1 }}
                                            multiline
                                            name='description'
                                            type="text"
                                            // label='Description'
                                            placeholder='Description'
                                            variant="standard"
                                            id="description"
                                        />
                                    </div> */}
                                    <div>
                                        <button className={s.btn} type='submit' variant="contained" onClick={(e) => handleAdd(e)}>Add Flight</button>
                                        <button className={s.btn} onClick={handleClose}>Cancel</button>
                                    </div>
                                </Stack>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}