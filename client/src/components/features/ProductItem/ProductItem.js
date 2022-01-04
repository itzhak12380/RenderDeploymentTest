import React from 'react'
import './productsItem.css'
import BtnRender from './BtnRender'
function ProductItem({ product,isAdmin,deleteProduct,handleCheck }) {
 
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <div >
            <BtnRender product={product} deleteProduct={()=>deleteProduct(product._id ,product.images.public_id)} />
            </div>
        </div>
    )
}

export default ProductItem
