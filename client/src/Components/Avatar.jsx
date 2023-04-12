import React from 'react'

const Avatar = ({Name}) => {
    const style = {
        width:'45px',
        height:'45px',
        borderRadius:'50%',
        fontSize : '30px',
        fontFamily : 'Poppins',
        backgroundColor : '#F7941D',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color : '#fff'
    }
  return (
    <div style={{width:'30%'}}>
        <div style={style}>
            {Name[0]}
        </div>
    </div>
  )
}

export default Avatar