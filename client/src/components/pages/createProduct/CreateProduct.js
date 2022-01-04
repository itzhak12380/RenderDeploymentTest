import React, { useState, useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import Loading from '../../features/loading/Loading'
import './createProduct.css'
import { Navigate, useParams } from "react-router-dom";
import {API} from '../../service/api-service'
const initialState = {
    product_id: "",
    title: "",
    price: "120",
    description: "In general, a product is defined as a “thing produced by",
    content: "In general, a product is defined as a “thing produced by labor or effort” or the “result of an act or a process. ” The word “product” stems from the verb “produce”, from the Latin prōdūce(re) “(to) lead or bring forth. ” Since 1575, the word “product” has referred to anything produced.",
    category: "",
    _id: ""
}

function CreateProduct() {
    const state = useContext(globalState)
    const [product, setproduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [productCall, setproductCall] = state.productsAPI.productCall
    const [image, setimage] = useState(false)
    const [loading, setloading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [Done, setDone] = useState(false)
    const [onEdit, setonEdit] = useState(false)
    const Products = state.productsAPI.products.products
    const params = useParams()
    useEffect(() => {
        if (params.id) {
            setonEdit(true)
            setloading(true)
            Products.forEach(product => {
                if (product._id === params.id) {
                    setproduct(product)
                    setimage(product.images)
                }
            })
            setloading(false)
        }
        else {
            setonEdit(false)
            setproduct(initialState)
            setimage(false)
        }
    }, [params.id, Products])
    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            if (!isAdmin) return alert("You are not admin")
            const file = e.target.files[0]
            if (!file) return alert("File do's not exist")
            if (file.size > 1024 * 1024) return alert("File size is too large!")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File format is incorrect.")
            let formDate = new FormData()
            formDate.append('file', file)
            setloading(true)
            const res = await fetch(`${API}/api/upload`, {
                method: "post", headers: {
                    "Authorization": `Bearer ${localStorage.accessToken}`
                },
                body: formDate
            }).then(res => res.json()).then(responce => responce).catch(error => error)
            setloading(false)
            setimage(res);

        } catch (error) {
            alert(error.message)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You are not admin")
            setloading(true)
            await fetch(   ` ${API}/api/destroy`, {
                method: "post", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.accessToken}`
                },
                body: JSON.stringify({ public_id: image.public_id })
            }).then(res => res.json()).then(responce => responce).catch(error => error)
            setloading(false)
            setimage(false)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setproduct({ ...product, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not admin")
            if (!image) return alert("No image choosen")

            if (onEdit) {

                await fetch(`${API}/api/product/${product._id}`, {
                    method: "put", headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.accessToken}`
                    },
                    body: JSON.stringify({ ...product, image: image })
                }).then(res => res.json()).then(responce => console.log(responce)).catch(error => error)


                setproductCall(!productCall)
                setDone(true)
            }
            else {
                await fetch(`${API}/api/product`, {
                    method: "post", headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.accessToken}`
                    },
                    body: JSON.stringify({ ...product, image: image })
                }).then(res => res.json()).then(responce => responce).catch(error => error)


                setproductCall(!productCall)
                setDone(true)
            }

        }
        catch (error) {
            alert(error.message)
        }
    }
    const styleUpload = {
        display: image ? "block" : "none"
    }
    if (Done === true) {
        return <Navigate to='/' />
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /> </div> : <div id="file_img" style={styleUpload}>
                        <img src={image ? image.url : ""} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }

            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" required value={product.product_id} disabled={onEdit} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" required value={product.title} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" required value={product.price} onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" required value={product.description} onChange={handleChangeInput} rows="5" />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" required value={product.content} onChange={handleChangeInput} rows="7" />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories :</label>
                    <select name="category" required value={product.category} onChange={handleChangeInput}>
                        <option value="" >Please select a category </option>
                        {
                            categories.map((category) => {
                                return (
                                    <option value={category._id} key={category._id} > {category.name}  </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button type="submit" >{onEdit ? "update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
