import React, { useState, useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import ProductItem from '../../features/ProductItem/ProductItem'
import './products.css'
import Loading from '../../features/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'
import {API} from '../../service/api-service'
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
    const [isLogged] = state.userAPI.isLogged
    const [LoadingState, setLoadingState] = useState(false)
    const [isCheck, setisCheck] = useState(false)
    const handleCheck = (id) => {
        console.log(id);
        // console.log(products);
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        });
        setproduct([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoadingState(true)
            const destroyImage = fetch(`${API}/api/destroy`, {
                method: "post", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.accessToken}`
                },
                body: JSON.stringify({ public_id })
            }).then(res => res.json()).then(responce => responce).catch(error => error)
            const deleteProduct = fetch(`${API}/api/product/${id}`, {
                method: "delete", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.accessToken}`
                }
            }).then(res => res.json()).then(responce => responce).catch(error => error)
            await destroyImage
            await deleteProduct
            setproductCall(!productCall)
            setLoadingState(false)
        } catch (error) {
            alert(error.message)
        }
    }
    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setproduct([...products])
        setisCheck(!isCheck)
    }
    const getProduct = async () => {
        const res = await fetch(`${API}/api/product?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`, {
            method: "get", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            }
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        setproduct(res.products);
        setResult(res.result)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }
    useEffect(() => {
        getProduct()
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
                        return <ProductItem key={products._id} product={products} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    })
                }
            </div>
            <LoadMore/>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products
