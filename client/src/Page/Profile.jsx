import React, { useEffect, useState } from 'react'
import profile from '../assets/profileIcon.svg'
import './style.css'
import './hamburger.css'
// import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from "framer-motion"
import { URl } from '../Components/AxiosUtil'
import {Link} from 'react-router-dom'

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
  const [Type,setType] = useState(0);
  const [address,setAddress] = useState("");

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
      setType(res.data.Type)
      setAddress(res.data.Address)
      // console.log(user);
    }).catch((err)=>{
      // console.log(err);
    })
  },[])

  const [ham,setHam] = useState(false); 

  const handleHam = ()=>{
    setHam(!ham);
  }
  
  return (
    <motion.div 
    initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
    <div className='profile-main'>
      
      <div className="profile-header-section">
        <div style={{display:'flex',flexDirection:'column',height:'max-content',alignItems:'flex-end',zIndex:'1',position:'absolute',width:'100%'}}>
        
        <div id='nav-res-btn' className='nav-res' >
          {/* <input type="checkbox" name="" id="" /> */}
        <div className='res-nav-btn' onClick={handleHam} >
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
        {
          ham&&
        <div className="ham-content">
          <ul>
            {Type===0 && <li><Link to='/SellerAccount'>Upgarde to seller</Link></li>}
            <li><Link to='/Orders'>My Orders</Link></li>
            <li><Link to='/Cart'>Cart</Link></li>
            {Type===1 && <li><Link to='/MyProducts'>My Products</Link></li>}
            {Type===1 && <li><Link to='/CustomerOrders'>Customer Orders</Link></li>}
          </ul>
        </div>
        }
        </div>
          <img src={profile} alt="" />
      </div>
      <div style={{display:'flex',width:"100%"}}>
        <p>Name : {Name}</p>
        <p>Email : {Email}</p>
        {address.length && <p>Address : {address}</p>}
      </div>

      <span></span>
      <div className="history">
        <h2> Search History</h2>
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