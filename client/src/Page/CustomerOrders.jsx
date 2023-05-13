import React ,{useEffect , useState} from 'react'
import Navbar from '../Components/Navbar'
import { URl } from '../Components/AxiosUtil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../Components/OrderCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerOrders = () => {
    const navigate = useNavigate();
    const [orderList,setOrderList] = useState([]);
    const [sId,setSid] = useState('');
    const token = JSON.parse(localStorage.getItem('id'));
    const [isUpdate,setIsUpdate] = useState(false);
    useEffect(()=>{
      if(token && token.length){
        const url = `${URl}/customerOrders?token=${token}`
        const options = {
          method : 'GET',
          headers : {'content-type' : 'application/json'},
          url
        }
        axios(options)
        .then((res)=>{
          // console.log(res.data);
          setOrderList(res.data.orders);
          setSid(res.data.id);
        }).catch((err)=>{
          toast('Some error occured')
        })
      }else{
        toast('Login first');

      }
    },[isUpdate])
  return (
    <div style={{boxSizing:'border-box',padding:'15px 25px'}}>
      <ToastContainer/>
        <Navbar/>
        <div>
          {
            orderList.map((e)=>{
              return (<OrderCard order={e} isUpdate={isUpdate} setIsUpdate={setIsUpdate} seller = {sId} />)
            })
          }
        </div>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          {
            orderList.length === 0 && <h2 style={{fontFamily:'Poppins',color:'#cbbfbf '}}>No orders</h2>
          }
        </div>
    </div>
  )
}

export default CustomerOrders