import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  } from "../actions/index";
import s from "./styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setDestination(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch((departure));
    setName("");
  };

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
