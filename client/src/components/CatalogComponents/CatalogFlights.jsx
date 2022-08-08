import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import data from "./ColumnsDG.js";
import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from "../styles/Catalog.module.css";
import { editToFlights } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFlights } from '../../redux/actions/index';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CountriesList from './CountriesList';
import TimeDate from './TimeDate';
import TimeHour from './TimeHour';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const columns = data;
let flightIds = [];
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

function handleRowSelection(selectedRows) {

    flightIds = selectedRows;
    console.log(flightIds);
}

function CatalogFlights({ rows, airlineFlights, setAirlineFlights }) {

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)
    const [open, setOpen] = React.useState(false);
    const [dataFlight, getData] = React.useState([]);
    // const mese = useSelector(state => state.messeage)   

    const [valuesPrice, setValuesPrice] = React.useState({ price: '' });
    const realTime = new Date;
    const [DateDeparture, setValueDep] = React.useState(new Date(realTime));
    const [DateArrival, setValueArriv] = React.useState(new Date(realTime));
    const [dateHour, setHour] = React.useState(new Date(realTime));
    const [dateDepHour, SetDepHour] = React.useState(new Date(realTime));
    const [dateCountriesList, setCountriesList] = React.useState('');
    const [dateCountriesListDest, setCountriesListDest] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(editToFlights(dataFlight));
        setAirlineFlights(false)
        setTimeout(() => (window.location.reload()), 500)
    }
    const data = [  { code: 'AD', label: 'Andorra' }];
    function setFormData() {
        debugger;
   
        
        setHour(dataFlight.arrivalHour);
        console.log(dataFlight);
    }

    function handleDelete(e) {
        if (flightIds.length > 0) {
            e.preventDefault();
            dispatch(deleteFlights(flightIds));
            setAirlineFlights(false)
            setTimeout(() => (window.location.reload()), 500)
        } else {
            alert("Choose a flight");
        }
    }

    const handleChangeTime = (e) => {
        const date = e;
        console.log(date.toISOString().slice(0, 10))
        setValueArriv(date);
    }
    const handleChangeHour = (e) => {
        console.log(e);
        setHour(e);
    }
    const handleChangeDepHour = (e) => {
        console.log(e);
        SetDepHour(e);
    }
    const handleChangeDepDate = (newValue) => {
        setValueDep(newValue);
    }
    const handleCountriesListOrig = (e) => {
        setCountriesList(e.currentTarget.innerText);
    }
    const handleCountriesListDest = (e) => {
        console.log(e);
        setCountriesListDest(e.currentTarget.innerText);
    }
    const handleChangeAdo = (prop) => (event) => {
        setValuesPrice({ ...valuesPrice, [prop]: event.target.value });
    };

    return [
        <Box sx={{ height: 400, width: '100%' }}>
            {airlineFlights && rows ?
                <DataGrid
                    onRowDoubleClick={(params, event) => {
                        debugger;
                        setOpen(true);
                        getData(params?.row);
                        setFormData();

                    }}
                    onSelectionModelChange={(e) => { handleRowSelection(e) }}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

                />

                : <h2></h2>
            }
        </Box>,
        <button className={s.btn} onClick={(e) => handleDelete(e)}>Delete</button>,
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={s.container}>
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight='bold'>
                        Edit flight:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <form >
                            <Stack spacing={1} >
                                {/* <div>
                                    {/* <label>Flight: </label> 
                                        <TextField sx={style.inp}
                                            type='text'
                                            label='ID Flight'
                                            placeholder='Flight'
                                            name='flight'
                                            id="flight" 
                                            variant="standard"
                                        />
                                    </div> */}
                                <div className={s.inputCont}>
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
                                        <TextField sx={style.inp}
                                            name='logo'
                                            defaultValue={dataFlight.logo}
                                            type="text"
                                            size="small"
                                            // label='Logo'
                                            placeholder='Logo'
                                            id="logo"
                                            variant="standard"
                                        />
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file" />
                                            <ImageSearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className={s.inputCont}>
                                    <div >
                                        <CountriesList
                                            label={"Origin"}
                                            id="outlined-origin"
                                            handleCountriesList={handleCountriesListOrig}
                                            defaultValue={data[0]}
                                        />
                                    </div>
                                    <div>
                                        <CountriesList
                                            label={"Destination"}
                                            id="outlined-destination"
                                            handleCountriesList={handleCountriesListDest}
                                            //defaultValue={dataFlight.destination}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextField sx={style.inp}
                                        name='duration'
                                        type="text"
                                        // label='Duration'
                                        placeholder='Duration Estimated'
                                        id="duration"
                                        variant="standard"
                                        defaultValue={dataFlight.durationEstimated}
                                    />
                                </div>
                                <div className={s.inputCont}>
                                    <TimeDate
                                        label={"Departure Date"}
                                        id="depD"
                                        handleChangeDate={handleChangeDepDate}
                                        value={DateDeparture} 
                                        defaultValue={dataFlight.departureDate}/>
                                    <TimeHour
                                        label={"Departure Hour"}
                                        id="depH"
                                        handleChangeHour={handleChangeDepHour}
                                        value={dateDepHour}
                                        defaultValue={dataFlight.departureHour}
                                    />
                                </div>
                                <div className={s.inputCont}>
                                    <TimeDate
                                        label={"Arrival Date"}
                                        id="arrD"
                                        handleChangeDate={handleChangeTime}
                                        value={DateArrival}
                                        defaultValue={dataFlight.arrivalDate} />
                                    <TimeHour
                                        label={"Arrival Hour"}
                                        id="arrH"
                                        handleChangeHour={handleChangeHour}
                                        value={dateHour}
                                        //defaultValue={dataFlight.arrivalHour}
                                    />
                                </div>
                                <div className={s.inputCont}>
                                    <div>
                                        <FormControl variant="filled">
                                            <InputLabel htmlFor="filled-adornment">Price</InputLabel>
                                            <FilledInput
                                                id="filled-adornment"
                                                //value={valuesPrice.price}                                                
                                                onChange={handleChangeAdo('price')}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                defaultValue={dataFlight.price}
                                            />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <TextField sx={style.inp}
                                            name='stock'
                                            type="number"
                                            placeholder='Stock'
                                            id="stock"
                                            variant="standard"
                                            defaultValue={dataFlight.stock}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <TextField fullWidth sx={{ m: 1 }}
                                        multiline
                                        name='description'
                                        type="text"
                                        // label='Description'
                                        placeholder='Description'
                                        variant="standard"
                                        id="description"
                                        defaultValue={dataFlight.description}
                                    />
                                </div>
                                <div>
                                    <button className={s.btn} onClick={(e) => handleSave(e)} >Save</button>
                                    <button className={s.btn} onClick={handleClose}>Cancel</button>
                                </div>
                            </Stack>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>


    ];




};



export default CatalogFlights