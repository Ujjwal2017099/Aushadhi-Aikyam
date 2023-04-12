import React, { useEffect, useState } from 'react'
import profile from '../assets/profileIcon.svg'
import './style.css'
// import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from "framer-motion"
import { URl } from '../Components/AxiosUtil'

const Profile = () => {
  // let history = [
  //   "dolo",
  //   "calpol",
  //   "syrup"
  // ]
  // const [queryParameters] = useSearchParams();
  const token = JSON.parse(localStorage.getItem('id'))
  const [Email,setEmail] = useState("");
  const [Name,setName] = useState("");
  const [History,setHistory] = useState([]);

  useEffect(()=>{
    // console.log(token);
    const data = JSON.stringify({
        token
    })
    const url = `${URl}/profile?token=${token}`
    const options = {
        method: "GET",
        headers: { 'content-type': 'application/json' },
        data,
        url
    };
    axios(options)
    .then((res)=>{
      // console.log(res.data);
      setName(res.data.Name)
      setEmail(res.data.Email)
      setHistory(res.data.History)
      // console.log(user);
    }).catch((err)=>{
      // console.log(err);
    })
  },[])
  
  return (
    <motion.div 
    initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
    <div className='profile-main'>
      <div className="profile-header-section">
        <div>
        </div>
          <img src={profile} alt="" />
      </div>
      <div style={{display:'flex',width:"100%"}}>
        <p>Name : {Name}</p>
        <p>Email : {Email}</p>
      </div>

      <span></span>
      <div className="history">
        <h2>History</h2>
        {
          History.length ? 
          History.map((e)=>{
            return(
              <div style={{color:'#00000',borderBottom:'1px solid black',fontFamily:'Poppins',marginTop:'10px'}}>
                {e}
              </div>
            )
          }):
          <div style={{color:'#cbbfbf',fontFamily:'Poppins',marginTop:'15px',display:'flex',justifyContent:'center'}}>
            Nothing To Show
          </div>
        }
      </div>
    </div>
    </motion.div>
  )
}

export default Profile