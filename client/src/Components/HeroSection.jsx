import React, {   useState } from 'react'
import icon from '../assets/icon.svg'
// import Link from 'react-router-dom'
import search from '../assets/search.png'
import './style.css'

const HeroSection = () => {
    const [head,sethead] = useState("");
    const [coordinate,setCoordinate] = useState([0,0]);
    const headContent = [
        "Welcome to Aushadhi Aikyam...",
        "Compare your prescription cost from different websites..."
    ]
    
    
    setTimeout(()=>{
        let i=coordinate[0],j=coordinate[1];
        let length = headContent[i].length;
        
        if(coordinate[1]===length) {
            setCoordinate([(coordinate[0]+1)%headContent.length,0]);
            j=0;
            i=coordinate[0];
            sethead("")
        }
        else {
            sethead(head+headContent[i][j]);
            setCoordinate([i,j+1])
        }
    },200)
    
  return (
    <div className='hero-main'>
        <span>
            <h1>{head+'|'}</h1>
            <form action="">
                <button type="submit"><img src={search} alt="" /></button>
                <input className='file-input' type="file" required/>
            </form>
        </span>
        <img src={icon} alt="" />
    </div>
  )
}

export default HeroSection