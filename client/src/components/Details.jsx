import React from 'react'
import { useParams } from "react-router-dom";

function Details(props) {
  const { id }= useParams();
  // console.log(props)

  return (
    <div>Details</div>
  )
}

export default Details