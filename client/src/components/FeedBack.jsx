import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments, getAllUsers } from "../redux/actions/index.js";
import css from './styles/Comments.module.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function FeedBack({ airlineId, airline }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const allComments = useSelector(state => state.comments)
    const [ comments, updateComments ] = useState([allComments])

    const airlineComments = comments.filter(e => airlineId === e.airlineId)
  
    const getData = async () => {
      updateComments(allComments);
    }
  
    useEffect(() => {
      localStorage.getItem("comments") !== null
        ? updateComments(JSON.parse(localStorage.getItem("comments")))
        : getData();
    }, []);

    const rating = airlineComments?.map(e => e.rating)

    const sumaRating = rating?.reduce((e, a) => e + Number(a), 0)

    const totalRating = (sumaRating/(airlineComments.length))

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllComments())
    }, [dispatch])

  return (
    <div className={css.container_feedback}>
      <div className={css.title_main}>
        <h1 className={css.review_title}>{airline}</h1>
        <Box>
          <Rating
            name="text-feedback"
            value={totalRating}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </Box>        
      </div>

        <div className={css.review_container}>
        <h1 className={css.review_title}>Customers Review:</h1>
        <br />
            { airlineComments.length ? airlineComments.map(e => {
                return (
                  <div className={css.reviewer} key={e.id}>
                    <Box>
                      <Rating
                        name="text-feedback"
                        value={e.rating}
                        readOnly
                        precision={1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                    </Box>
                    <h5 className={css.text}>User: {e.name}</h5>
                    <h5 className={css.text}>Comment: "{e.comment}"</h5>
                  </div>
                )
            }) 
            : 
            (<div>
                <h1 className={css.no_review}>This airline does not have any reviews</h1>
            </div>)}        
        </div>

    </div>
  )
}
