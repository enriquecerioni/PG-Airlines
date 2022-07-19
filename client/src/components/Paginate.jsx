import React, { useState } from "react";

export default function Paginate({cardPerPage, total, paginate}) {

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
        <div>
            <div>
                <button onClick={e => handlePrev(e)}>Previous</button>
            </div>

        {pageNumbers.map(num => {
            return (<li key={num}>
                <button value={num} onClick={() => paginate(num)}>{num}</button>
            </li>)
        })}

            <div>
                <button onClick={e => handleNext(e)}>Next</button>
            </div>
        </div>
    )
}
