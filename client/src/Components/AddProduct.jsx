import React, { useState } from 'react'
import mainIcon from '../assets/loginRightIcon.png'
import axios from 'axios'
import {URl} from './AxiosUtil'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = ({setAddPrd}) => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [pin,setPin] = useState("");
    const [price,setPrice] = useState(null);
    const token = JSON.parse(localStorage.getItem('id'));
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(token && token.length){
            const url = `${URl}/addProducts?token=${token}`
            const data = JSON.stringify({
                title,description,pin,price
            })

            const options = {
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                url,
                data
            }

            axios(options)
            .then((res)=>{
                toast('Your Product Successfully added')
                setAddPrd(false)
            }).catch((err)=>{
                toast('Something went wrong please try later')
            })
        }else{
            navigate('/login');
        }
    }

  return (
    <div style={{position:'absolute', boxSizing:'border-box' , background:'#fff',zIndex:'1',width:'95%',display:'flex',justifyContent:'center'}}>
        <ToastContainer />
        <div className="login-main-right" style={{width:'50%',fontFamily:'Poppins'}}>
            <div className="login-right-inside">
                <div className="login-heading">
                    <img src={mainIcon} alt="" />
                    <h1>Aushadhi Aikyam</h1>
                </div>
                <form action="" onSubmit={handleSubmit} >
                    <h1 style={{marginTop:'40px'}}>Enter Product Details</h1>
                    
                    <input type="text" name="Name" placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}  required/>
                    <input type="text" name="Desc" placeholder='Description' value={description} onChange={(e)=>{setDescription(e.target.value)}}  required/>
                    <input type="number" name="price" placeholder='Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}  required/>
                    <input type="text" name="pin" placeholder='PIN' pattern='^\d{6}$' value={pin} onChange={(e)=>{setPin(e.target.value)}} required/>

                    <button type="submit">Submit</button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProduct