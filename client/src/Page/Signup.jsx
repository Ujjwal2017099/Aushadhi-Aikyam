import React, { useState } from 'react'
import './style.css'
import loginIcon from '../assets/loginLeft.svg'
import mainIcon from '../assets/loginRightIcon.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [name , setName] = useState("");

    const navigate = useNavigate();
    const registerUser = (e)=>{
        e.preventDefault();
        const url = `http://localhost:8000/register`
        console.log(email,password);
        const data = JSON.stringify({
            name,email,password
        })
        const options = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            data,
            url
        };
         axios(options)
        .then((res)=>{
            navigate('/login')
        //   setData(res.data);
          // console.log(res.data);
        }).catch((err)=>{
          // console.log(err);
        })
    }
  return (
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
                    <h1 style={{marginTop:'40px'}}>Welcome!</h1>
                    <input type="text" name="Name" placeholder='Name' id="" value={name} onChange={(e)=>{ setName(e.target.value)}} required/>
                    <input type="email" name="Email" placeholder='Email' id="" value={email} onChange={(e)=>{ setEmail(e.target.value)}} required/>
                    <input type="password" name="Password" placeholder='Password' id="" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button type="submit">Submit</button>
                    <p>By proceeding, you agree to the Terms &
                        Conditions and Privacy Policy.</p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup