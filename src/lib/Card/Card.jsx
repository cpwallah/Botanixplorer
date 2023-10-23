import React from 'react'
import "./Card.css"

const Card = ({ children }) => {
  return (
    <div className='card-conatiner'>{children}</div>
  )
}

export default Card;
