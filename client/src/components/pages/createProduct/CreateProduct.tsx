import React, { useState, useContext, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import Loading from '../../features/loading/Loading'
import './createProduct.css'
import { Navigate, useParams } from "react-router-dom";
import { updateProduct } from '../../../service/productService';
import { uploadImage, destroyImage } from '../../../service/imageService';
import { GetErrorMessage } from "../../../service/api-service"
import { IProduct, IProductImage } from '../../../Types/products'
import { ICategories } from '../../../Types/categoriesType'
import { PRODUCT_INITIALSTATE } from '../../../Types/initialState'


function CreateProduct() {
    const state = useContext(globalState)
    const [product, setproduct] = useState<IProduct>(PRODUCT_INITIALSTATE)
    const { categories } = state!.categoriesAPI.categories
    const { productCall, setproductCall } = state!.productsAPI.productCall
    const [image, setimage] = useState<IProductImage>({ isImage: false, public_id: "", url: "" })
    const [loading, setloading] = useState<boolean>(false)
    const { isAdmin } = state!.userAPI.isAdmin
    const [Done, setDone] = useState(false)
    const [onEdit, setonEdit] = useState(false)
    const products = state!.productsAPI.products.products
    const params = useParams()

    useEffect(() => {
        try {
            if (params.id) {
                setonEdit(true)
                setloading(true)
                products.forEach((product: IProduct) => {

                    if (product._id === params.id) {
                        setproduct({
                            ...product
                        })
                        setimage({ isImage: true, public_id: product.images.public_id, url: product.images.url })
                    }
                })
                setloading(false)
            }
            else {
                setonEdit(false)
                setproduct(PRODUCT_INITIALSTATE)
                setimage({ isImage: false, public_id: "" })
            }
        } catch (error) {
            GetErrorMessage(error)
        }

    }, [params.id, products])
    const handleUpload = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()

        try {
            if ((e.target as HTMLInputElement)) {
                if (!isAdmin) return alert("You are not admin")
                const file = (e.currentTarget as HTMLInputElement).files![0];
                if (!file) return alert("File do's not exist")
                if (file.size > 1024 * 1024) return alert("File size is too large!. \n size must be smaller or equal  to 1024 * 1024 ")
                if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File format is incorrect.")
                let formDate = new FormData()
                formDate.append('file', file)
                setloading(true)
                const res = await uploadImage(formDate)
                setloading(false)
                setimage({ isImage: true, public_id: res.public_id, url: res.url });
            }

        } catch (error) {
            GetErrorMessage(error)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You are not admin")
            setloading(true)
            await destroyImage(image.public_id)
            setloading(false)
            setimage({ isImage: false, public_id: "", })
        } catch (error) {
            GetErrorMessage(error)
        }
    }

    const handleChangeInput = (e: React.FormEvent) => {
        const { name, value } = (e.currentTarget as HTMLInputElement)
        setproduct({ ...product, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not admin")
            if (!image) return alert("No image choosen")
            await updateProduct(product, image, onEdit)
            setproductCall(!productCall)
            setDone(true)
        }
        catch (error) {
            GetErrorMessage(error)
        }
    }
    const styleUpload = {
        display: image.isImage ? "block" : "none"
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
                    <textarea typeof='text' name="description" required value={product.description} onChange={handleChangeInput} rows={5} />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea typeof="text" name="content" required value={product.content} onChange={handleChangeInput} rows={7} />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories :</label>
                    <select name="category" required value={product.category} onChange={handleChangeInput} >
                        <option disabled value="" >Please select a category </option>
                        {
                            categories.map((category: ICategories) => {
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
