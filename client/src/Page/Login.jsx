import React, { useEffect, useState } from 'react'
import './style.css'
import loginIcon from '../assets/loginLeft.svg'
import mainIcon from '../assets/loginRightIcon.png'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion"
import { URl } from '../Components/AxiosUtil'

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [err,setError] = useState(false);
    const token = JSON.parse(localStorage.getItem('id'));
    
    useEffect(()=>{
        const url = `${URl}/profile`
        
        const data = JSON.stringify({
            token
        })
        const options = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            data,
            url
        };
        axios(options)
        .then((res)=>{
            console.log(res.data);
            if(res.data){
                // localStorage.setItem('id',JSON.stringify(token));
                setError(false);
                navigate(`/profile`)
            }else{
                setError(true);
            }
        }).catch((err)=>{
          // console.log(err);
        })
    },[])

    const navigate = useNavigate();
    const registerUser = (e)=>{
        e.preventDefault();
        const url = `${URl}/login?email=${email}&password=${password}`
        // console.log(email,password);
        // const data = JSON.stringify({
        //     email,password
        // })
        const options = {
            method: "GET",
            headers: { 'content-type': 'application/json' },
            url
        };
         axios(options)
        .then((res)=>{
            // console.log(res.data);
            const token =res.data;
            if(token && token.length){
                localStorage.setItem('id',JSON.stringify(token));
                navigate(`/`)
                // console.log(token);
            }else{
                setError(true)
            }
        //   setData(res.data);
          // console.log(res.data);
        }).catch((err)=>{
          // console.log(err);
          setError(true)
        })
    }
  return (
    <motion.div 
    initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
    <div className='login-main'>
        <div className="login-main-left">
            <img src={loginIcon} alt="" />
            <h1>Profile Management</h1>
        </div>
        <div className="login-main-right">
            <div className="login-right-inside">
                <div className="login-heading">
                    <img src={mainIcon} alt="" />
                    <h1>Aushadhi Aikyam</h1>
                </div>
                <form action="" onSubmit={registerUser}>
                    <h1 style={{marginTop:'40px'}}>Login!</h1>
                    {err&&<div style={
                        {backgroundColor:'#f1aeb5',
                            padding:'7px 10px',
                            borderRadius:'5px',
                            color:'#58151c',
                            border : '1px solid #58151c'
                        }}>Email/Password or both are incorrect</div>}
                    <input type="email" name="Email" placeholder='Email'  value={email} onChange={(e)=>{ setEmail(e.target.value)}} required/>
                    <input type="password" name="Password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button type="submit">Submit</button>
                    <p>Don't have an account <Link to='/signup' >click here</Link> to Signup</p>
                </form>
            </div>
        </div>
    </div>
    </motion.div>
  )
}

export default Login