import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByAirlines } from '../../redux/actions';

function FilterByAirlines() {
    let [airlinesData, setAirlines] = useState([]);
    const dispatch = useDispatch();
    const flights = useSelector((state) => state.copyFlights)

    function handleSearchAirlines(e) {

        const allAirlines = flights.map(f => f.airline);
        let airlines = allAirlines.filter((v, i) => {
            return allAirlines.indexOf(v) === i;
        })
        if (e.target.value != '') {
            airlines = airlines.filter(f => f.toLowerCase().includes(e.target.value.toLowerCase()));
            setAirlines(airlines);
        } else {
            setAirlines([]);
        }
    }

    function handleClick(e) {
        console.log(e)
        dispatch(filterByAirlines(e.currentTarget.value));
        document.getElementById('search').value = ''
    }

    return (
        <div>
            <label>Airlines</label>
            <input
                id='search'
                type="text"
                placeholder='Search...'
                onChange={(e) => { handleSearchAirlines(e) }}
            />

            {
                airlinesData.length != 0 ?
                    <div >

                        {airlinesData?.map(a => {
                            return (<input value={a} type="text" onClick={e => { handleClick(e) }} />)
                        })
                        }

                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}

export default FilterByAirlines