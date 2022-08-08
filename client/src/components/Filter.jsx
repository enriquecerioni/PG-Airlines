import React, { useContext } from 'react'
import style from './styles/Display.module.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { darkModeContext } from './DarkModeContext';

const marks = [
    { value: 10, label: '< $20.000' },
    { value: 45, label: '$20.000 - $40.000' },
    { value: 80, label: '> $40.000' },
    { value: 100, label: 'All' }
];

// {handlePrice, handleAlph}
function Filter({ handlePrice, handleAlph, orderPriceSelect, orderAlpSelect, handleFilterPrice, airlinesData, handleClick, orderByPrice, orderAlphabetically }) {

    const allAirlines = airlinesData.map(f => {
        return({
            name: f.name,
            id:f.id
        });

    });

    function handleReset(e) {
        e.preventDefault();
        window.location.reload(false)
    }

    function valuetext(value) {
        return `${value}`;
    }
    
    const { darkMode } = useContext(darkModeContext)

  return (
    <div className={ darkMode ? style.main_container_dark : style.main_container}>


        <h2 className={darkMode ? style.textColor_dark : style.textColor}>Filter by:</h2>
        <label className={darkMode ? style.textColor_dark : style.textColor}>Price: </label>
        <Box sx={{ width: 300, color: '#fff' }}>
                <Slider className={style.slider}
                    aria-label="Custom marks"
                    defaultValue={100}
                    getAriaValueText={valuetext}
                    step={null}
                    marks={marks}
                    onChange={handleFilterPrice}
                />
            </Box>
            <div>
                <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={allAirlines.map((option) => option.name)}
                    sx={{ width: 300 }}
                    onChange={(e, value) =>{
                        handleClick(value)
                    } }
                    renderInput={(params) => <TextField {...params} label="By Airlines" />}
                />
            </div>

            <h2>Order:</h2>
            <div>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Price</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={orderByPrice}
                        ref={orderPriceSelect}
                        onChange={e => handlePrice(e)}
                        autoWidth
                        label="Price"
                    >
                        <MenuItem value={"initial"}>Price</MenuItem>
                        <MenuItem value={"high"}>High to low</MenuItem>
                        <MenuItem value={"low"}>Low to High</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* <select onChange={e => handleAlph(e)} ref={orderAlpSelect} >
            <option value='initial'>Alphabet</option>
            <option value="asc">A - Z</option>
            <option value="dsc">Z - A</option>
        </select> */}
            <div>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Alphabet</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={orderAlphabetically}
                        onChange={e => handleAlph(e)}
                        ref={orderAlpSelect}
                        autoWidth
                        label="Alphabet"
                    >
                        <MenuItem value={'initial'}>Alphabet</MenuItem>
                        <MenuItem value={"asc"}>A - Z</MenuItem>
                        <MenuItem value={"dsc"}>Z - A</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* <button onClick={handleReset}>RESET FILTER</button> */}
            <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="contained" size="medium" onClick={handleReset}>
                    RESET FILTER
                </Button>
            </Box>
        </div>
    )
}

export default Filter