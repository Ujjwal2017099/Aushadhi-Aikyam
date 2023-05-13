import React ,{useState ,useEffect } from 'react'
import './style.css'
import { URl } from './AxiosUtil'
import axios from 'axios'

const ProductCard = ({productId ,display , setTotalPrice , totalPrice}) => {
  const [title,setTitle] = useState("This is title")
    const [description,setDescription] = useState("this is description")
    const [price,setPrice] = useState("565")

    useEffect(()=>{
      const url = `${URl}/individualProduct?productId=${productId}`
      const options = {
        method : 'GET',
        headers : {'content-type' : 'application/json'},
        url
      }
      axios(options)
      .then((res)=>{
        console.log(res.data);
        setDescription(res.data.Description)
        setTitle(res.data.Name)
        setPrice(res.data.Price)
        // console.log(totalPrice);
        if(typeof totalPrice !== "undefined") {setTotalPrice( price);}
      }).catch((err)=>{

      })
    },[])
  return (
    <div class="card-local" style={{display:display ? display : 'inline-block',margin:'10px 15px'}}>
      <div class="card-local-img"></div>
      <div class="card-local-info">
        <p class="text-title">{title} </p>
        <p class="text-body">{description}</p>
      </div>
      <div class="card-local-footer">
        <span class="text-title" >{price}</span>
        
      </div>
    </div>
  )
}

export default ProductCard