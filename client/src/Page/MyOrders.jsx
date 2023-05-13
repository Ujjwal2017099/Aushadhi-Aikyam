import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import { URl } from '../Components/AxiosUtil';
import axios from 'axios';
import MyIndividualOrder from '../Components/MyIndividualOrder';

const MyOrders = () => {
    const token = JSON.parse(localStorage.getItem('id'));
    const [allOrders,setAllOrders] = useState([]);
    useEffect(()=>{
        if(token && token.length){
            const url =  `${URl}/order?token=${token}`
            const options = {
                method : 'GET',
                headers : {'content-type' : 'application/json'},
                url
            }
            axios(options)
            .then((res)=>{
                // console.log(res.data);
                setAllOrders(res.data);
            }).catch((err)=>{

            })
        }
    },[])
  return (
    <div style={{padding:'20px 10px',boxSizing:'border-box'}}>
        <Navbar/>
        {
            allOrders.map((e)=>{
                return (<MyIndividualOrder orderId={e}/>)
            })
        }
    </div>
  )
}

export default MyOrders