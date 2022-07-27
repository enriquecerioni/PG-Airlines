import React, { useState } from "react"; 
import style from '../styles/Display.module.css'

export default function Paginate({cardPerPage, currentPage, total, paginate, isActive}) {

    const [actual, setActual] = useState(1)
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(total / cardPerPage); i++) {
        pageNumbers.push(i)
    }

 
    function handlePrev(e) {
        e.preventDefault();
        if(actual === 1) {
            paginate(1)
        } else {
            paginate(actual - 1)
            setActual(actual - 1)
        }
    }

    function handleNext(e) {
        e.preventDefault();
        if(actual === pageNumbers.length) {
            paginate(pageNumbers.length)
        } else {
            paginate(actual + 1)
            setActual(actual + 1)
        }
    }

    return (
        <div className={style.paginate_container}>
            <div>
                <button id={style.btns_paginate} onClick={e => handlePrev(e)}>Previous</button>
            </div>

        {pageNumbers.map(num => {
            return (<li className={style.li_numbers} key={num}>
                <button className={currentPage === num ? style.numberBtn : style.btn} value={num} onClick={() => paginate(num)}>{num}</button>
            </li>)
        })}

            <div>
                <button id={style.btns_paginate} onClick={e => handleNext(e)}>Next</button>
            </div>
        </div>
    )
}
