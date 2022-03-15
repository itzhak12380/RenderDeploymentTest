import { API, GetErrorMessage } from "./api-service"
import {IProduct , IsImage} from '../Types/products'

export const getProduct = async (page: number, category: string, sort: string, search: string, setproduct: Function, setResult: Function) => {
    try {
        const res = await fetch(`${API}/api/product?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`, {
            method: "get", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            }
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        setproduct(res.products);
        setResult(res.result)
        console.log(res.products);
        
    } catch (error) {
        GetErrorMessage(error)
    }

}


export const deleteProduct = async (id: string | undefined, public_id: string) => {
    try {
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
    } catch (error) {
        GetErrorMessage(error)
    }
}



export const updateProduct = async (product:IProduct,image:IsImage,onEdit:boolean)=>{
    if(onEdit){
           await fetch(`${API}/api/product/${product._id}`, {
        method: "put", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`
        },
        body: JSON.stringify({ ...product, image: {public_id:image.public_id,url:image.url} })
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    }
    else{
        await fetch(`${API}/api/product`, {
            method: "post", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`
            },
            body: JSON.stringify({ ...product, image: {public_id:image.public_id,url:image.url} })
        }).then(res => res.json()).then(responce => responce).catch(error => error)

    }
}