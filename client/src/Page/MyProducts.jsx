import React ,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import './style.css'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { URl } from '../Components/AxiosUtil'

const MyProducts = () => {
  const navigate = useNavigate();
    const [title,setTitle] = useState("This is title")
    const [description,setDescription] = useState("this is description")
    const [price,setPrice] = useState("565")
    const [products,setProducts] = useState([]);
    const token = JSON.parse(localStorage.getItem('id'));

    useEffect(()=>{
      if(token && token.length){
        const url = `${URl}`
      }else{
        navigate('/login')
      }
    },[])

    const addProduct = ()=>{

    }
  return (
    <div className='products-main'>
      <Navbar/>
        <div className='procduts-add'>
            <button className='btn' onClick={addProduct}>Add Product</button>
        </div>

        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />
        <ProductCard title={title} description={description} price={price} />

    </div>
  )
}

export default MyProducts