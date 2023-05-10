import React ,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { URl } from './AxiosUtil';

const MyIndividualOrder = ({orderId}) => {
    const [address,setAddress] = useState('');
    const [productName,setProductName] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [productPin,setProductPin] = useState('');
    const [price,setPrice] = useState(0);
    const [status,setStatus] = useState(0);
    const [style1,setStyle1] = useState({});
    const [style2,setStyle2] = useState({});
    const [style3,setStyle3] = useState({fontFamily:'Roboto'});
    const token = JSON.parse(localStorage.getItem('id'));
    useEffect(()=>{
        const url = `${URl}/myIndividualOrder?order=${orderId}&token=${token}`
        const options = {
            method : 'GET',
            headers : {'content-type' : 'application/json'},
            url
        }
        axios(options)
        .then((res)=>{
            console.log(res.data);
            setAddress(res.data.Address);
            setStatus(res.data.Status);
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

                if(status===2){
                    // setStyle1({border:'1px solid red' ,backgroundColor:'rgb(241 174 181)'})
                    // setStyle2({fill:'red'})
                    // setStyle3({color:'red',fontFamily : 'Roboto'})

                }
            }).catch((err)=>{

            })
        }).catch((err)=>{

        })
    },[])
  return (
     <div className="notifications-container" >
        <ToastContainer />
        {
            status === 2 ?
        
      <div className="success" style={{border:'1px solid red' ,backgroundColor:'rgb(241 174 181)'}}>
        <div className="flex">
          <div className="flex-shrink-0">

            <svg className="succes-svg" style={{fill:'red'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                <h3 style={{color:'red',fontFamily : 'Roboto'}}>{status===0 ? 'Pending' : (status===1 ? 'Delivered' : 'Rejected')}</h3>
              </div>
          </div>
        </div>
      </div>
       :
       <div className="success" >
        <div className="flex">
          <div className="flex-shrink-0">

            <svg className="succes-svg"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                <h3 style={{fontFamily:'Roboto'}}>{status===0 ? 'Pending' : (status===1 ? 'Delivered' : 'Rejected')}</h3>
              </div>
          </div>
        </div>
      </div>
        }
    </div>
  )
}

export default MyIndividualOrder