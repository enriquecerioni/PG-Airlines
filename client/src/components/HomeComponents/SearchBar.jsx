import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlightInfo } from '../../redux/actions/index'
import s from '../styles/SearchBar.module.css'
import { darkModeContext } from "../DarkModeContext";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState("");
  const [lstOrigin, setlistOrigin] = useState("")
  const [destination, setDestination] = useState("");
  const [lstDestination, setlistDestination] = useState("")
  const flights = useSelector((state) => state.flights);

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "origin") {
      const allOrigins = flights.map(f => f.origin);
      let countriesOrig = allOrigins.filter((v, i) => {
        return allOrigins.indexOf(v) === i;
      })
      if (e.target.value !== '') {
        countriesOrig = countriesOrig.filter(f => f.toLowerCase().includes(e.target.value.toLowerCase()));
        setlistOrigin(countriesOrig);
      } else {
        setlistOrigin([]);
      }
    }
    if (e.target.name === "destination") {
      const allDestinations = flights.map(f => f.destination);
      let countriesDest = allDestinations.filter((v, i) => {
        return allDestinations.indexOf(v) === i;
      })
      if (e.target.value !== '') {
        countriesDest = countriesDest.filter(f => f.toLowerCase().includes(e.target.value.toLowerCase()));
        setlistDestination(countriesDest);
      } else {
        setlistDestination([]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFlightInfo({ origin: origin, destination: destination }));
    setOrigin("");
    setDestination("");
  };

  function handleClick(e) {
    e.preventDefault();
    if (e.target.name === "origin") {
      document.getElementById('origin').value = e.target.value;
      setOrigin(e.target.value)
      setlistOrigin([]);
    } else if (e.target.name === "destination") {
      document.getElementById('destination').value = e.target.value;
      setDestination(e.target.value);
      setlistDestination([]);
    }
  }

  const { darkMode } = useContext(darkModeContext)

  return (
    <div className={s.container}>
      <div className={s.form}>
        <input
          className={ darkMode ? s.inputSearch_dark : s.inputSearch}
          type="text"
          name="origin"
          id='origin'
          onChange={(e) => handleInputChange(e)}
          required
        />
        <label className={s.name}>
          <span className={s.nomb}>
          Origin

        {lstOrigin.length !== 0 ?
          <div >
            {lstOrigin?.map(o => {
              return (<input defaultValue={o} type="text" name="origin" onClick={e => handleClick(e)} />)
            })}
          </div>
          :
          <div></div>}
          </span>
        </label>
      </div>
      <div className={s.form}>
        <input
          className={ darkMode ? s.inputSearch_dark : s.inputSearch}
          type="text"
          name="destination"
          id='destination'
          onChange={(e) => handleInputChange(e)}
          required
        />
        <label className={s.name}>
          <span className={s.nomb}>
            Destination

        {lstDestination.length !== 0 ?
          <div >
            {lstDestination?.map(d => {
              return (<input defaultValue={d} type="text" name="destination" onClick={e => handleClick(e)} />)
            })}
          </div>
          :
          <div></div>}
          </span>
        </label>
      </div>
      
      <button
        className={ darkMode ? s.btn_dark : s.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        <i className='bx bx-search'></i>
      </button>
    </div>
  );
}
