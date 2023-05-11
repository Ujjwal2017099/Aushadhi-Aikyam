import React ,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import './style.css'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { URl } from '../Components/AxiosUtil'
import AddProduct from '../Components/AddProduct'

const MyProducts = () => {
  const navigate = useNavigate();
    
    const [products,setProducts] = useState([]);
    const token = JSON.parse(localStorage.getItem('id'));

    const [addPrd,setAddPrd] = useState(false);
    useEffect(()=>{
      if(token && token.length){
        const url = `${URl}/getProducts?token=${token}`
        const options = {
          method : 'GET',
          headers : {'content-type' : 'application/json'},
          url
        }

        axios(options)
        .then((res)=>{
          // console.log(res.data);
          setProducts(res.data.products);
        }).catch((err)=>{
          alert('Something went wrong please try again later')
          navigate('/login')
        })
      }else{
        navigate('/login')
      }
    },[addPrd])
    const addProduct = ()=>{
      setAddPrd(!addPrd);
    }

  return (
    <div className='products-main'>
      <Navbar/>
        <div className='procduts-add'>
            <button className='btn' onClick={addProduct}>Add Product</button>
        </div>
        {addPrd&&<AddProduct setAddPrd = {setAddPrd} />}

        {
          products.map((e)=>{
            return (<ProductCard productId={e} />)
          })
        }
        

    </div>
  )
}

export default MyProducts