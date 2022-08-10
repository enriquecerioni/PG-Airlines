import React, { useState, useContext } from "react";
import style from "../styles/Display.module.css";
import { darkModeContext } from "../DarkModeContext";
export default function Paginate({
  cardPerPage,
  currentPage,
  total,
  paginate,
  isActive,
}) {
  const { darkMode } = useContext(darkModeContext);

  const [actual, setActual] = useState(currentPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / cardPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlePrev(e) {
    e.preventDefault();
    if (actual === 1) {
      paginate(currentPage);
    } else {
      paginate(currentPage - 1);
      setActual(currentPage - 1);
    }
  }

  function handleNext(e) {
    e.preventDefault();
    if (actual === pageNumbers.length) {
      paginate(pageNumbers.length);
    } else {
      paginate(currentPage + 1);
      setActual(currentPage + 1);
    }
  }

  return (
    <div className={darkMode ? style.paginate_container_dark : style.paginate_container}>
      <div>
        <button
          id={darkMode ? style.btns_paginate_dark : style.btns_paginate}
          onClick={(e) => handlePrev(e)}
          disabled={currentPage + 1 === currentPage}
        >
          Previous
        </button>
      </div>

      {pageNumbers.map((num) => {
        return (
          <li className={style.li_numbers} key={num}>
            <button
              className={
                darkMode
                  ? (currentPage === num
                    ? style.numberBtn_dark
                    : style.btn_dark)
                  : (currentPage === num
                  ? style.numberBtn
                  : style.btn)
              }
              value={num}
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          </li>
        );
      })}

      <div>
        <button
          id={darkMode ? style.btns_paginate_dark : style.btns_paginate}
          onClick={(e) => handleNext(e)}
          disabled={currentPage - 1 === currentPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
