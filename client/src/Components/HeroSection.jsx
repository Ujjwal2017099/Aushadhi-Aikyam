import React, {   useState ,useEffect} from 'react'
import icon from '../assets/icon.svg'
import {Link }from 'react-router-dom'
import search from '../assets/search.png'
import './style.css'
import axios from 'axios'
import Avatar from './Avatar'

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
     const token = JSON.parse(localStorage.getItem('id'));

  const [Name,setName] = useState("");

  useEffect(()=>{
    const url = `http://localhost:8000/profile?token=${token}`
    
    const options = {
        method: "GET",
        headers: { 'content-type': 'application/json' },
        url
    };
    axios(options)
    .then((res)=>{
        // console.log(res.data);
        if(res.data){
            setName(res.data.Name)
        }
    }).catch((err)=>{
      // console.log(err);
    })
  },[])
    const logout = ()=>{
        localStorage.setItem('id',JSON.stringify(""));
        setName('');
    }
  return (
    <div className='hero-main'>
        <span>
            <h1>{head+'|'}</h1>
            <form action="">
                <button type="submit"><img src={search} alt="" /></button>
                <input className='file-input' type="file" required/>
            </form>
            <span style={{display:'flex',flexDirection:'row',gap:'0px',marginTop:'50px'}}>
                {!Name&&<div className="login-btn"><Link to='/Login'>Login</Link></div>}
                {!Name&&<div className="login-btn" style={{marginLeft:'5px'}} ><Link to='/Signup'>Signup</Link></div>}
                {Name&&<div className="login-btn" onClick={logout}>Logout</div>}
            </span>
        </span>
        <div style={{width:'30%',display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            {Name&&<Link to='/profile' target='_blank'><Avatar Name={Name}/></Link>}
            <img src={icon} alt="" />
        </div>
    </div>
  )
}

export default HeroSection