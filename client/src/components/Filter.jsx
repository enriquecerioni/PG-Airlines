import React from 'react'
import style from './styles/Display.module.css'

// {handlePrice, handleAlph}
function Filter({handlePrice, handleAlph, orderPriceSelect, orderAlpSelect, handleFilterPrice}) {

  return (
    <div className={style.main_container}>
        {/* 
        <label>Duration</label>
            <input
                type="range"
                min='0'
                max='10000'
                step="0.01"
            />

        <button>Lowest price</button>
        <button>The best option</button>
        <button>Faster</button> */}

        <h2>Filter by:</h2>
        <label>Price: </label>
            <button value='all' onClick={handleFilterPrice}>All</button>
            <button value='>20.000' onClick={handleFilterPrice}> &gt; $20.000</button>
            <button value='between' onClick={handleFilterPrice}> $20.000 - $40.000 </button>     
            <button value='<40.000' onClick={handleFilterPrice}> $40.000 &gt;</button>
        
        <h2>Order:</h2>
        <select onChange={e => handlePrice(e)} ref={orderPriceSelect} >
            <option value='initial'>Price</option>
            <option value="high">High to low</option>
            <option value="low">Low to High</option>
        </select>

        <select onChange={e => handleAlph(e)} ref={orderAlpSelect} >
            <option value='initial'>Alphabet</option>
            <option value="asc">A - Z</option>
            <option value="dsc">Z - A</option>
        </select>

        <button>RESET FILTER</button>
    </div>
  )
}

export default Filter