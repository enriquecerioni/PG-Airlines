import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { createComment } from "../redux/actions/index.js";

function Comments({details, airlines}) {

  const dispatch = useDispatch()
//////////////////////
  // CREAR COMENTARIO //
  const allComments = useSelector(state => state.comments)
  console.log(allComments)

  function validate(input) {
    let error = {}

    if(input.name === '') {
      error.name = 'Enter a name'
    } else {
      error.name = ''
    }

    if(input.rating === '') {
      error.rating = 'Enter a rating value'
    } else if(input.rating !== '' && (input.rating < 1 || input.rating > 5)) {
      error.rating = 'Rating value must be between 0 and 5'
    } else {
      error.rating = ''
    }

    if(input.comment === '') {
      error.comment = 'Enter a comment'
    } else {
      error.comment = ''
    }

    return error;
  }

  const [ error, setError ] = useState({
    rating: '',
    comment: '',
    name: '' 
  })

  const [ input, setInput ] = useState({
      rating: '',
      comment: '',
      name: '',
      moreInfo: [
        {
        flightName: '',
        origin: '',
        destination: ''        
      }
    ]
  })

  function handleInputChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  function handleSubmitComment(e) {
    e.preventDefault()

    if(
      input.rating && input.comment && input.name
    ) {

      dispatch(createComment(input))
      setInput({
        rating: '',
        comment: '',
        name: '',
        moreInfo: [
          {
          flightName: ''     
          } 
        ]       
      })

    } else {
        console.log('formulario incorrecto')
    }
  }


  let airline = airlines.map((airline) => {
    if (details.airlineId === airline.id) {
      return airline.name
    }
  })

  function handleQuestion(e) {
    e.preventDefault()

  }

  return (
    <div>
        {/* CREAR COMENTARIO - FALTAN RUTAS EN BACK */}
        <div style={{ "margin": 10 + 'rem'}}>
            <h3>Este vuelo fue publicado por: {details.airline} </h3>
            <h3>RATING DE LA AEROLINEA</h3>
            <h3>COMENTARIOS PREVIOS</h3>
            {/* {comments.map(e => 
            return (<span>{e.rating}</span>))} */}
            <h3>Publicar comentario y rating</h3>
            <form onSubmit={handleSubmitComment}>
            <h3>INPUT DE RATING</h3>
            {/* <Box sx={{'& > legend': { mt: 2 },}}>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
                />
            </Box> */}
            {/* <input 
            type="number"
            name='rating'
            value={input.rating}
            onChange={handleInputChange}
            /> */}

            <Box sx={{'& > legend': { mt: 2 },}}>
                <Rating
                    name='rating'
                    value={input.rating}
                    onChange={handleInputChange}
                />
            </Box>
            {error.rating && <span>{error.rating}</span>}

            <h5>Input nombre de la persona que quiere hacer comentario</h5>
            <input
            type="text"
            value={input.name}
            name='name'
            onChange={handleInputChange}
            />
            {error.name && <span>{error.name}</span>}

            <h5>Input nombre del vuelo de donde lo conocen</h5>
            <input 
            type="text" 
            name="flightName"
            value={input.flightName}
            onChange={handleInputChange}
            />

            <h3>INPUT DE COMENTARIO</h3>
            <input 
            type="text" 
            name='comment'
            value={input.comment}
            onChange={handleInputChange}
            />
            {error.comment && <span>{error.comment}</span>}

            <button type="submit">Publicar</button>
            <br />
            <span>Su comentario puede ser eleminado si es conciderado inapropiado o se demuestra que no tiene relacion con la aerolinea</span>                    
            </form> 

            <br />
            <br />
            <form>
            <h3>PREGUNTAS SOBRE LA AEROLINEA O VUELO</h3>
            <h5>Aca iria la pregunta del cliente</h5>
                <input
                type="text"
                placeholder='Escribi tu pregunta'
                onChange={handleQuestion}
            /> 

            <h5>Aca iria la respuesta de la aerolinea</h5>
            </form>
        </div>   
    </div>
  )
}

export default Comments