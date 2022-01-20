import { API } from "./api-service"

export const getProduct = async (page, category, sort, search, setproduct, setResult) => {
    const res = await fetch(`${API}/api/product?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`, {
        method: "get", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`,
        }
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    setproduct(res.products);
    setResult(res.result)
}


export const deleteProduct = async (id, public_id) => {
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
        alert(error.message)
    }
}


export const updateProduct = async (product,image,onEdit)=>{
    if(onEdit){
           await fetch(`${API}/api/product/${product._id}`, {
        method: "put", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`
        },
        body: JSON.stringify({ ...product, image: image })
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    }
    else{
        await fetch(`${API}/api/product`, {
            method: "post", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`
            },
            body: JSON.stringify({ ...product, image: image })
        }).then(res => res.json()).then(responce => responce).catch(error => error)

    }
}