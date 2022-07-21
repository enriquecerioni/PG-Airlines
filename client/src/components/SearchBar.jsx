import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState("");
  const flight = useSelector((state) => state.flights);

  const handleInputChange = (e) => {
    e.preventDefault();
    setOrigin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findFlight(origin));
    setOrigin("");
  };

  const findFlight = (item) => {
    return item.origin === origin;
  };
  const a = flight.find(findFlight);


  return (
    <div className={s.search}>
      <input
        className={s.inputSearch}
        type="text"
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
