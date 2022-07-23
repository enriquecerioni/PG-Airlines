import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFlightInfo } from "../redux/actions";
import s from "./styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState("");
  // const flights = useSelector((state) => state.flights);

  const handleInputChange = (e) => {
    e.preventDefault();
    setOrigin(e.target.value);
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getFlightInfo(origin));
    setOrigin("");
  };

  return (
    <div className={s.search}>
      <input
        className={s.inputSearch}
        type="text"
        placeholder="Search origin"
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
