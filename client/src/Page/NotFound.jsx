import React from 'react'
import four04 from '../assets/404.png'
import 'animate.css';

const notFound = () => {
    const style = {
        width : '100vw',
        height : '100vh',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    }
  return (
    <div style={style}>
        <img className='animate__hinge' src={four04} alt="" />
    </div>
  )
}

export default notFound