import { API, GetErrorMessage } from "./api-service"

export const uploadImage = async (formDate: FormData) => {
    try {
        const res = await fetch(`${API}/api/upload`, {
            method: "post", headers: {
                "Authorization": `Bearer ${localStorage.accessToken}`
            },
            body: formDate
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}


export const destroyImage = async (public_id: string) => {
    try {
        const res = await fetch(` ${API}/api/destroy`, {
            method: "post", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`
            },
            body: JSON.stringify({ public_id: public_id })
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}
