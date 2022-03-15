import { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { globalState } from '../globalState/GlobalState'
import ProductItem from '../ProductItem/ProductItem'
import './detailProduct.css'
import { IProduct } from '../../Types/products'

const initialstate = {
    product_id: "",
    title: "",
    price: 120,
    description: "In general, a product is defined as a “thing produced by",
    content: "In general, a product is defined as a “thing produced by labor or effort” or the “result of an act or a process. ” The word “product” stems from the verb “produce”, from the Latin prōdūce(re) “(to) lead or bring forth. ” Since 1575, the word “product” has referred to anything produced.",
    category: "",
    _id: "",
    images: { url: "string", public_id: "string" },
    checked: false,
    sold: 0,
    quantity: 0
}
function DetailProduct() {
    const params = useParams()
    const state = useContext(globalState)
    const [detailProduct, setdetailProduct] = useState<IProduct>(initialstate)
    const product = state.productsAPI.products.products
    const addCart = state.userAPI.addCart

    useEffect(() => {
        if (params.id) {
            product.forEach((element: IProduct) => {
                if (element._id === params.id) setdetailProduct(element)
            });
        }

    }, [params, product])

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
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p> Sold: {detailProduct.sold}</p>
                    <Link className="cart" to="/cart" onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>
            <div>
                <h2>realted products</h2>
                <div className="prodcuts">
                    {
                        product.map((product: IProduct) => {
                            return product.category === detailProduct.category ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
