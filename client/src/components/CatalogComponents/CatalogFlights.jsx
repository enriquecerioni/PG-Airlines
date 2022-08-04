import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import data from "./ColumnsDG.js";
import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from "../styles/Catalog.module.css";
import { editToFlights } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFlights } from '../../redux/actions/index'
import useId from '@mui/material/utils/useId.js';

const columns = data;
let flightIds = [];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5
};

function handleRowSelection(selectedRows) {
 
        flightIds = selectedRows;
      console.log(flightIds);
  }

function CatalogFlights({ rows }) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [dataFlight, getData] = React.useState(false);
    const mese = useSelector(state => state.messeage)    
     
    const handleOpen = () => setOpen(true);

    //const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSave = (e) => {
        e.preventDefault();
        dispatch(editToFlights(dataFlight));
    }
    
    function handleDelete(e){
        if(flightIds.length > 0){
            e.preventDefault();
            dispatch(deleteFlights(flightIds));
            //window.location.href = "http://localhost:3000/catalog";
        }else{
            alert("Choose a flight");
        }
         
    }

    // function handleFlight(e) {
    //     dataFlight.flight = e.target.value;
    // }
    // function handleAirline(e) {
    //     dataFlight.airline = e.target.value;
    // }
    function handleLogo(e) {
        dataFlight.logo = e.target.value;
    }
    function handlePrice(e) {
        dataFlight.price = e.target.value;
    }
    function handleStock(e) {
        dataFlight.stock = e.target.value;
    }
    function handleOrigin(e) {
        dataFlight.origin = e.target.value;
    }
    function handleDuration(e) {
        dataFlight.duration = e.target.value;
    }
    function handleDepH(e) {
        dataFlight.departureHour = e.target.value;
    }
    function handleArrH(e) {
        dataFlight.arrivalHour = e.target.value;
    }
    function handleDestination(e) {
        dataFlight.destination = e.target.value;
    }
    function handleDepD(e) {
        dataFlight.departureDate = e.target.value;
    }
    function handleArrD(e) {
        dataFlight.arrivalDate = e.target.value;
    }
    function handleDescription(e) {
        dataFlight.description = e.target.value;
    }


    return [
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                onRowDoubleClick={(params, event) => {

                    setOpen(true);
                    getData(params.row);

                }}
                onSelectionModelChange ={(e) => { handleRowSelection(e)}}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection

            />
        </Box>,
         <button className={s.btn} onClick={(e)=>handleDelete(e)}>Delete</button>,
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <button className={s.button} onClick={handleClose}>x</button>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight='bold'>
                        Edit flight:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <form className={s.form}>
                            {/* <div><label for="flight">Flight: </label>
                                <input
                                    onChange={(e) => { handleFlight(e) }}
                                    name='flight'
                                    value={dataFlight.id}
                                />
                            </div>
                            <div><label>Airline: </label>
                                <input
                                    onChange={(e) => { handleAirline(e) }}
                                    name='airline'
                                    type="text"
                                    defaultValue={dataFlight.airline}
                                />
                            </div> */}
                            <div><label for="logo">Logo: </label>
                                <input
                                    onChange={(e) => { handleLogo(e) }}
                                    name='logo'
                                    type="text"
                                    defaultValue={dataFlight.logo}
                                />
                            </div>
                            <div><label for="price">Price: </label>
                                <input
                                    onChange={(e) => { handlePrice(e) }}
                                    name='price'
                                    type="number"
                                    defaultValue={dataFlight.price}
                                />
                            </div>
                            <div><label for="stock">Stock: </label>
                                <input
                                    onChange={(e) => { handleStock(e) }}
                                    name='stock'
                                    type="number"
                                    label='Stock'
                                    defaultValue={dataFlight.stock}
                                />
                            </div>
                            <div><label>Origin: </label>
                                <input
                                    onChange={(e) => { handleOrigin(e) }}
                                    name='origin'
                                    type="text"
                                    defaultValue={dataFlight.origin}
                                />
                            </div>
                            <div><label for="duration">Duration: </label>
                                <input
                                    onChange={(e) => { handleDuration(e) }}
                                    name='duration'
                                    type="text"
                                    defaultValue={dataFlight.durationEstimated}
                                />
                            </div>
                            <div><label>Departure Hour: </label>
                                <input
                                    onChange={(e) => { handleDepH(e) }}
                                    name='depH'
                                    type="text"
                                    defaultValue={dataFlight.departureHour}
                                />
                            </div>
                            <div><label>Arrival Hour: </label>
                                <input
                                    onChange={(e) => { handleArrH(e) }}
                                    name='arrH'
                                    type="text"
                                    defaultValue={dataFlight.arrivalHour}
                                />
                            </div>
                            <div><label>Destination: </label>
                                <input
                                    onChange={(e) => { handleDestination(e) }}
                                    name='destination'
                                    type="text"
                                    defaultValue={dataFlight.destination}
                                />
                            </div>
                            <div><label>Departure Date: </label>
                                <input
                                    onChange={(e) => { handleDepD(e) }}
                                    name='depD'
                                    type="text"
                                    defaultValue={dataFlight.departureDate}
                                />
                            </div>
                            <div><label>Arrival Date: </label>
                                <input
                                    onChange={(e) => { handleArrD(e) }}
                                    name='arrD'
                                    type="text"
                                    defaultValue={dataFlight.arrivalDate}
                                />
                            </div>
                            <div><label>Description: </label>
                                <input
                                    onChange={(e) => { handleDescription(e) }}
                                    name='description'
                                    type="text"
                                    label='Description'
                                    defaultValue={dataFlight.description}
                                />
                            </div>
                            <div>
                                <button className={s.btn} onClick={(e)=>handleSave(e)} >Save</button>
                                <button className={s.btn} onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>


    ];




};



export default CatalogFlights