import { API, GetErrorMessage } from "./api-service";

export const PostPayment = async (cart: Array<Object>, paymentID: string, address: string) => {
    try {

        await fetch(`${API}/api/payment`, {
            method: "post", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            },
            body: JSON.stringify({ cart: cart, paymentID, address })
        }).then(res => res.json()).then(responce => responce).catch(error => error)

    } catch (error) {
        GetErrorMessage(error)
    }

}


export const AddToCart = async (cart: Array<Object>) => {
    try {
        await fetch(`${API}/user/addcart`, {
            method: "put", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            },
            body: JSON.stringify(cart)
        }).then(res => res.json()).then(responce => responce).catch(error => error)
    } catch (error) {
        GetErrorMessage(error)
    }

}