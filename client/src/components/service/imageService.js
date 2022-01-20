import { API } from "./api-service"

export const uploadImage = async (formDate) => {
    const res = await fetch(`${API}/api/upload`, {
        method: "post", headers: {
            "Authorization": `Bearer ${localStorage.accessToken}`
        },
        body: formDate
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    return res
}

export const destroyImage = async (public_id) => {
    const res = await fetch(` ${API}/api/destroy`, {
        method: "post", headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.accessToken}`
        },
        body: JSON.stringify({ public_id: public_id })
    }).then(res => res.json()).then(responce => responce).catch(error => error)
    return res
}