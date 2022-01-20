import { API } from "./api-service";
export const postPayment = async (cart, paymentID, address) => {
    await fetch(`${API}/api/payment`, {
        method: "post", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify({ cart: cart, paymentID, address })
    }).then(res => res.json()).then(responce => responce).catch(error => error)
}

export const addToCart = async (cart) => {
    await fetch(`${API}/user/addcart`, {
        method: "put", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify(cart)
    }).then(res => res.json()).then(responce => responce).catch(error => error)
}