import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFlightInfo } from '../../redux/actions/index'
import s from '../styles/SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  // const flights = useSelector((state) => state.flights);

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "origin") {
      setOrigin(e.target.value);
    }
    if (e.target.name === "destination") {
      setDestination(e.target.value);
    }    
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFlightInfo({origin: origin, destination: destination}));
    setOrigin("");
    setDestination("");
  };

  return (
    <div className={s.search}>
      <input
        className={s.inputSearch}
        type="text"
        name="origin"
        placeholder="Search origin"        
        onChange={(e) => handleInputChange(e)}
      />
      <input
        className={s.inputSearch}
        type="text"
        name="destination"
        placeholder="Search destination"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={s.btnSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
