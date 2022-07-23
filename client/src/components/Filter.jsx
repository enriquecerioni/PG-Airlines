import React from 'react'
import style from './styles/Display.module.css'

// {handlePrice, handleAlph}
function Filter({handlePrice, handleAlph, orderPriceSelect, orderAlpSelect, handleFilterPrice, airlinesData, handleClick, handleSearchAirlines}) {

    function handleReset(e) {
        e.preventDefault();
        window.location.reload(false)
    }

  return (
    <div className={style.main_container}>
        {/* 
        <button>Lowest price</button>
        <button>The best option</button>
        <button>Faster</button> */}

        <h2>Filter by:</h2>
        <label>Price: </label>
            <button value='all' onClick={handleFilterPrice}>All</button>
            <button value='>20.000' onClick={handleFilterPrice}> &gt; $20.000</button>
            <button value='between' onClick={handleFilterPrice}> $20.000 - $40.000 </button>     
            <button value='<40.000' onClick={handleFilterPrice}> $40.000 &gt;</button>

        <div>
        <label>Airlines</label>
            <input
                id='search'
                type="text"
                placeholder='Search...'
                onChange={(e) => { handleSearchAirlines(e)}}
            />

            {airlinesData.length !== 0 ?
                <div >
                {airlinesData?.map(a => {
                    return (<input value={a} type="text" onClick={e => handleClick(e)} />)
                })}

                </div>
                :
                <div></div>}
        </div> 
        
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

        <button onClick={handleReset}>RESET FILTER</button>
    </div>
  )
}

export default Filter