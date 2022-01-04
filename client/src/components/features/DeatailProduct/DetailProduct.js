import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { globalState } from '../globalState/GlobalState'
import ProductItem from '../ProductItem/ProductItem'
import './detailProduct.css'
function DetailProduct() {
    const params = useParams()
    const state = useContext(globalState)
    const [detailProduct, setdetailProduct] = useState([])
    const product = state.productsAPI.products.products
    const addCart =  state.userAPI.addCart

    useEffect(() => {
        if (params.id) {
            product.forEach(element => {
                if (element._id === params.id) setdetailProduct(element)
            });
        }

    }, [params, product])

    if (detailProduct.length === 0) return null
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url}
                    alt=""
                />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>${detailProduct.price}  </span>
                    <p>{detailProduct.descriptiond}</p>
                    <p>{detailProduct.content}</p>
                    <p> Sold: {detailProduct.sold}</p>
                    <Link className="cart" to="/cart" onClick={()=> addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>
            <div>
                <h2>realted products</h2>
                <div className="prodcuts">
                    {
                        product.map(product => {
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
