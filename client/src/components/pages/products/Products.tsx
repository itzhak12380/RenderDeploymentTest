import React, { useState, useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import ProductItem from '../../features/ProductItem/ProductItem'
import './products.css'
import Loading from '../../features/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'
import { getProduct } from '../../service/productService'
import { deleteProduct } from '../../service/productService'
import { IProduct } from '../../Types/products'

function Products() {
    const state = useContext(globalState)
    const { products, setproduct } = state!.productsAPI.products
    const { page } = state!.productsAPI.page
    const { category } = state!.productsAPI.category
    const { sort } = state!.productsAPI.sort
    const { search } = state!.productsAPI.search
    const { setResult } = state!.productsAPI.result
    const {isAdmin, setisAdmin} = state!.userAPI.isAdmin
    const { productCall, setproductCall } = state!.productsAPI.productCall
    const [LoadingState, setLoadingState] = useState<boolean>(false)
    const [isCheck, setisCheck] = useState(false)
    const [cheackCount, setcheackCount] = useState(0)


    const handleCheck = (id: string | undefined) => {
        products.forEach((product: IProduct) => {
            if (product._id === id) {
                product.checked = !product.checked
                if (product.checked === false) {
                    setcheackCount(check => check = check - 1)

                }
                else {
                    setcheackCount(check => check = check + 1)

                }
            }
        });
        setproduct([...products])
    }

    const checkAll = () => {
        products.forEach((product: IProduct) => {
            product.checked = !isCheck
        })
        if (!isCheck) {
            setcheackCount(check => check = products.length)
        }
        else {
            setcheackCount(check => check = 0)
        }
        setproduct([...products])
        setisCheck(!isCheck)
    }
    const deleteAll = async () => {
        setLoadingState(true)
        products.forEach((product: IProduct) => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
        setproductCall(!productCall)
        setLoadingState(false)
    }
    const deleteSingleProduct = async (product: IProduct) => {
        try {
            setLoadingState(true)
            await deleteProduct(product._id, product.images.public_id,)
            setproductCall(!productCall)
            setLoadingState(false)
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {

        getProduct(page, category, sort, search, setproduct, setResult)
    }, [productCall, category, sort, page, search])
    if (LoadingState) return <div ><Loading /></div>
    return (
        <>
            <Filters />
            {
                isAdmin && <div className="delete-all">
                    <span className='amount'> {cheackCount} product selected</span>
                    <div>
                        <span>Select all</span>
                        <input type="checkbox" onChange={checkAll} checked={isCheck} />
                    </div>

                    <button onClick={deleteAll}>Delete All</button>
                </div>
            }
            <div className="products">
                {
                    products.map((products: IProduct) => {
                        return <ProductItem key={products._id} product={products} isAdmin={isAdmin} deleteSingleProduct={deleteSingleProduct} handleCheck={handleCheck} />
                    })
                }
            </div>
            <LoadMore />
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
