import React , {useEffect,useState} from 'react'
import './style.css'
import axios from 'axios';
import { URl } from './AxiosUtil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderCard = ({order,seller,isUpdate,setIsUpdate}) => {
    // console.log(order);
    // console.log(seller);
    const [address,setAddress] = useState('');
    const [productName,setProductName] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [productPin,setProductPin] = useState('');
    const [price,setPrice] = useState(0);
    
    useEffect(()=>{
        const url = `${URl}/individualOrder?order=${order}&sId=${seller}`
        const options = {
            method : 'GET',
            headers : {'content-type' : 'application/json'},
            url
        }
        axios(options)
        .then((res)=>{
            // console.log(res.data);
            setAddress(res.data.Address);
            const url = `${URl}/individualProduct?productId=${res.data.ProductId}`;
            const options = {
                method : 'GET',
                headers : {'content-type' : 'application/json'},
                url
            }
            axios(options)
            .then((res)=>{
                // console.log(res.data);
                setPrice(res.data.Price);
                setProductName(res.data.Name);
                setProductDescription(res.data.Description);
                setProductPin(res.data.Pin);
            }).catch((err)=>{

            })
        }).catch((err)=>{

        })
    },[])

    const delivered = ()=>{
        const url = `${URl}/delivered`
        const data = JSON.stringify({
            order ,seller
        })
        const options = {
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            url,
            data
        }
        axios(options)
        .then((res)=>{
            // console.log(res);
            toast("Your order is successfully completed")
            setTimeout(()=>{
                setIsUpdate(!isUpdate);
            },3000)
        }).catch((err)=>{
            console.log(err.message);
        })
    }
    const regect = ()=>{
       const url = `${URl}/dropOrder`
        const data = JSON.stringify({
            order ,seller
        })
        const options = {
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            url,
            data
        }
        axios(options)
        .then((res)=>{
            // console.log(res);
            toast("Order is rejected")
            setTimeout(()=>{
                setIsUpdate(!isUpdate);
            },3000)
        }).catch((err)=>{
            console.log(err.message);
        })
    }
  return (
    <div className="notifications-container">
        <ToastContainer />
      <div className="success">
        <div className="flex">
          <div className="flex-shrink-0">

            <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div className="success-prompt-wrap">
            <p className="success-prompt-heading">Address : {address}
            </p><div className="success-prompt-prompt">
              <p>Name : {productName}</p>
              <p>Descripton : {productDescription}</p>
              <p>PIN : {productPin}</p>
              <p>Price : {price}/-</p>
            </div>
              <div className="success-button-container">
                <button type="button" className="success-button-main" onClick={delivered} >Delivered</button>
                <button type="button" className="success-button-secondary" onClick={regect} >Dismiss</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard