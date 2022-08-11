import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createComment, updateReview } from "../redux/actions/index.js";
import css from './styles/Comments.module.css'
import Swal from "sweetalert2";

export default function Comments({ detail, orderID,flightId, allStocks, setOpenReview}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

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
      name: user[0]?.name,
    airlineId: detail.airlineId,
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

 async function handleSubmitComment(e) {
    e.preventDefault()
    if(input.rating && input.comment && input.name) {
      // console.log("este es el input de mierda",input);
      await dispatch(createComment(input))

      allStocks?.map((stock)=>{
        if(stock.flightId===flightId) stock.review = true
      })
      
      dispatch(updateReview({orderID, allStocks}))

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your feedback has been send!',
        showConfirmButton: false,
        timer: 1000
      })

      setInput({
        rating: '',
        comment: '',
        name: user[0]?.name,
        moreInfo: [
          {
            flightName: '',
            origin: '',
            destination: ''     
          } 
        ],
        airlineId: detail.airlineId,    
      })
      setOpenReview(false)

    } else {
      setOpenReview(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete all fields!",
        confirmButtonColor: "#10408F",
      });
    }
  }

  return (
    <div className={css.comments_container}>
        <h3 className={css.modal_title}>Give us your feedback!</h3>

        <form className={css.form_container} onSubmit={handleSubmitComment}>
        <Box sx={{'& > legend': { mt: 2 },}}>
            <Rating
                type="number"
                name='rating'
                value={input.rating}
                onChange={handleInputChange}
            />
        </Box>
        {error.rating && <span>{error.rating}</span>}

        <TextField
          type="text"
          id="outlined-uncontrolled"
          label="Users name"
          name='name'
          defaultValue={input.name}
          focused
        />
        {error.name && <span>{error.name}</span>}

        <TextField
          id="outlined-multiline-static"
          label="Your comment"
          multiline
          rows={4}
          type="text" 
          name='comment'
          value={input.comment}
          onChange={handleInputChange}
          focused
        />

        {error.comment && <span>{error.comment}</span>}

        <br />
        <Button type="submit" variant="contained">Publicar</Button>
        </form> 
        <br />
    </div>   
  )
}