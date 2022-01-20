import React,{useContext} from 'react'
import './productsItem.css'
import BtnRender from './BtnRender'
import { globalState } from '../globalState/GlobalState'
function ProductItem({ product,isAdmin,deleteSingleProduct,handleCheck }) {
    const state = useContext(globalState)
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
            <BtnRender product={product} deleteProduct={()=>deleteSingleProduct(product)} />
            </div>
        </div>
    )
}

export default ProductItem
