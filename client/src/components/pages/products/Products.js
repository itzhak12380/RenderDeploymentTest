import React, { useState, useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import ProductItem from '../../features/ProductItem/ProductItem'
import './products.css'
import Loading from '../../features/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'
import { getProduct } from '../../service/productService'
import { deleteProduct } from '../../service/productService'
function Products() {
    const state = useContext(globalState)
    const { products, setproduct } = state.productsAPI.products
    const [page, setPage] = state.productsAPI.page
    const [category, setcategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [result, setResult] = state.productsAPI.result
    const [isAdmin, setisAdmin] = state.userAPI.isAdmin
    const [productCall, setproductCall] = state.productsAPI.productCall
    const [LoadingState, setLoadingState] = useState(false)
    const [isCheck, setisCheck] = useState(false)

    
    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        });
        setproduct([...products])
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setproduct([...products])
        setisCheck(!isCheck)
    }
    const deleteAll = async () => {
        setLoadingState(true)
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
        setproductCall(!productCall)
        setLoadingState(false)
    }
    const deleteSingleProduct = async (product) => {
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
                    <span>Select all</span>
                    <input type="checkbox" onChange={checkAll} checked={isCheck} />
                    <button onClick={deleteAll}>Delete All</button>
                </div>
            }
            <div className="products">
                {
                    products.map(products => {
                        return <ProductItem key={products._id} product={products} isAdmin={isAdmin} deleteSingleProduct={deleteSingleProduct} setLoadingState={setLoadingState} setproductCall={setproductCall} productCall={productCall} handleCheck={handleCheck} />
                    })
                }
            </div>
            <LoadMore />
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
