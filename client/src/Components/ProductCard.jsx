import React from 'react'
import './style.css'

const ProductCard = ({title,description,price}) => {
  return (
    <div style={{display:'inline-block',margin:'10px 20px 10px 0px'}}>
        <div className="prd-card">
            <div className="header">
              <div>
                <a className="title" href="#">
                  {title}
                </a>
                <p className="name">{price}</p>
              </div>
                <span className="image"></span>
            </div>
              <p className="description">
                {description}
              </p>
            
        </div>
    </div>
  )
}

export default ProductCard