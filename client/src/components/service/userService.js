import { API } from "./api-service";

export const userLogin = async (user) => {
    const res = await fetch(`${API}/user/login`, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...user }) })
        .then(res =>
            res.json())
        .then(responce => responce)
        .catch(error => error)

    return res
}

export const userRegister = async (user) => {
    const res = await fetch(`${API}/user/register`, { method: "post", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...user }) })
        .then(res => res.json())
        .then(responce => responce)
        .catch(error => error)
    return res
}

export const userInfo = async () => {
    const res = await fetch(`${API}/user/info`, {
        method: "get", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`
        }
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    return res
}

export const buyProduct = async (Cart, product) => {
    await fetch(`${API}/user/addcart`, {
        method: "put", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`,
        },
        body: JSON.stringify([...Cart, { ...product, quantity: 1 }])
    }).then(res => res.json()).then(responce => responce).catch(error => error)
}