import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='success__wrapper'> <Link to="/success">
    <button className='success__btn'>
      Successfull.</button>
    </Link>
    <p>
      Your order is being processed.Thanks for choosing Saeed Shop
    </p>
    </div>
  )
}

export default Success