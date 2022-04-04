import React from 'react'
import './productsItem.css'
import BtnRender from './BtnRender'
import { IProduct } from '../../../Types/products'

interface Props {
    product: IProduct;
    isAdmin?: boolean;
    deleteSingleProduct?: (product: IProduct) => void;
    handleCheck?: (_id: string) => void;
    key?: string

}
const ProductItem: React.FC<Props> = ({ product, isAdmin, deleteSingleProduct, handleCheck }) => {
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={() => { if (handleCheck) handleCheck(product._id) }} />
            }
            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <div >
                <BtnRender product={product} product_id={product._id} deleteProduct={() => { if (deleteSingleProduct) deleteSingleProduct(product) }} />
            </div>
        </div>
    )
}

export default ProductItem
