import React from 'react'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

function Details(props) {
  const { id }= useParams();
  // console.log(props)

  return (
    <div>
      <Link>
      </Link>
      Details
    </div>
  )
}

export default Details