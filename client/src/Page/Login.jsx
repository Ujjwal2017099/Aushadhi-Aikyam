import React, { useEffect, useState } from 'react'
import './style.css'
import loginIcon from '../assets/loginLeft.svg'
import mainIcon from '../assets/loginRightIcon.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [err,setError] = useState(false);
    const token = JSON.parse(localStorage.getItem('id'));
    
    useEffect(()=>{
        const url = `http://localhost:8000/profile`
        
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
        const url = `http://localhost:8000/login?email=${email}&password=${password}`
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
            if(token.length){
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
                        {backgroundColor:'#fb0000eb',
                            padding:'7px 5px',
                            borderRadius:'5px',
                            color:'#fff'
                        }}>!!! Email/Password or both are incorrect</div>}
                    <input type="email" name="Email" placeholder='Email'  value={email} onChange={(e)=>{ setEmail(e.target.value)}} required/>
                    <input type="password" name="Password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login