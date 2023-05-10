import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { URl } from '../Components/AxiosUtil';
import ProductCard from '../Components/ProductCard';
import Navbar from '../Components/Navbar'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('id'))
    const [data,setData] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [findCart,setFindCart] = useState(false)
    const [addAddress,setAddAddress] = useState(false);
    const [blur,setBlur] = useState(0);
    const [shipping,setShipping] = useState("")
    useEffect(()=>{
        if(token && token.length){
            const url = `${URl}/cartItems?token=${token}`
            const options = {
                method : 'GET',
                headers : {'content-type' : 'application/json'},
                url
            }
            axios(options)
            .then((res)=>{
                // console.log(res.data);
                setData(res.data)
            }).catch((err)=>{
                // console.log("err")
            })
        }else{
            alert('You have to login first')
            navigate('/login')
        }
    },[findCart])

    useEffect(()=>{
        let p=0;
        data.forEach(async (e)=>{
            const url = `${URl}/individualProduct?productId=${e}`
          const options = {
            method : 'GET',
            headers : {'content-type' : 'application/json'},
            url
          }
          const res = await axios(options)
          p += res.data.Price;
          setTotalPrice(p);
        })
    },[data])

    const handleRemove = (e)=>{
        // console.log(e);
        if(token && token.length){
            const url = `${URl}/removeFromCart?token=${token}`
            const data = JSON.stringify({
                productId : e
            })
            const options = {
                method : 'DELETE',
                headers : {'content-type' : 'application/json'},
                url,
                data
            }
            axios(options)
            .then((res)=>{
                // console.log('done');
                setFindCart(!findCart)
            }).catch((err)=>{
                alert('OOps something went wrong');
            })
        }else{
            alert('Something went wrong try again later');
            navigate('/login');
        }
    }

    const buyButton = ()=>{
        setAddAddress(true)
        setBlur(8);
    }

    const shipToThisAddress = (e)=>{
        e.preventDefault();
        if(shipping.length){
            // console.log('shipped');
            if(!token.length){
                alert('Something went wrong');
                navigate('/login');
            }
            const url = `${URl}/placeOrder?token=${token}`
            while(data.length){
                const _id = data.pop();
                const body = {
                    productId : _id,
                    address : shipping
                }
                const options = {
                    method : 'POST',
                    headers : {'content-type' : 'application/json'},
                    url,
                    data : body
                }

                axios(options)
                .then((res)=>{
                    // console.log('ok');
                    handleRemove(_id)
                }).catch((err)=>{
                    alert('Something unexpected occured please try later')
                    navigate('/')
                })
            }
        }else{
            alert('Please enter your address');
        }
    }
    const notify = () => toast("Your order is successfully placed ");

  return (
    <>
        {/* <div>
            <button onClick={notify}>Notify!</button>
            
        </div> */}
        {addAddress&&
            <div style={{position:'absolute',zIndex:'1',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:"center"}}>
                <form className="modal" onSubmit={shipToThisAddress} >
                    <span className="close" onClick={()=>{setAddAddress(false);setBlur(0);}} >X</span>
                        <div className="content">
                            <span className="title" style={{fontFamily:'Roboto',marginTop:'20px'}} >Enter Address</span>


                            <div className="actions">
                                <input class="button upload-btn"  value={shipping} onChange={(e)=>{setShipping(e.target.value)}} type="text" id="file" />

                            </div>

                        </div>
                        <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                            <button type="submit" onClick={notify} className='btn'>Order</button>
                            <ToastContainer />
                        </div>
                </form>
            </div>
        }
        <div style={{boxSizing:'border-box',padding:'18px 25px',filter:`blur(${blur}px)`}}>
            <Navbar />
            <h2 style={{fontFamily:'Roboto',margin:'10px 15px'}}>My Cart</h2>
            {
                data.map((e)=>{
                    return (
                    <div style={{display:'inline-block',width:'max-content',textAlign:'center',minHeight:'450px'}}>
                        <ProductCard productId={e} totalPrice={totalPrice} setTotalPrice={setTotalPrice} display='inline-block' />
                        <br />
                        <button className='btn' style={{display:'inline',width:'90%'}} onClick={()=>{handleRemove(e);}} >Remove</button>
                        <br />
                    </div>)
                })
            }

        </div>
        {
            data.length ? <div style={{position:'sticky',zIndex:'1' ,boxSizing:"border-box",padding:'10px 15px', borderTop:'2px solid #3d6aff',backgroundColor:'rgb(190 202 245)' , filter:`blur(${blur}px)`}}>
            
            <h2 style={{fontFamily:'Poppins'}}>Total Price is {totalPrice}</h2>
            <button className='btn' onClick={buyButton} >Buy Now</button>
            </div> : 
            <>
                <div style={{width:'100%',boxSizing:'border-box',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',color:'#cbbfbf',fontFamily:"Roboto",fontSize:'22px',fontWeight:'500'}}>
                    Nothing to show 
                </div>

            </>
        }
        </>
  )
}

export default Cart