import { API, GetErrorMessage } from "./api-service"


export const getCategories = async () => {
    try {
        const res = await fetch(`${API}/api/category`, {
            method: "get", headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(responce => responce)
            .catch(error => error)
        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}
export const updateCategory = async (category: string, id: string) => {
    try {
        const res = await fetch(`${API}/api/updateCategory/${id}`, {
            method: "put", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            },
            body: JSON.stringify({ name: category })
        })
            .then(res => res.json())
            .then(responce => responce)
            .catch(error => error)
        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}

export const newCategory = async (category: string) => {
    try {
        const res = await fetch(`${API}/api/creatCategory`, {
            method: "post", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            },
            body: JSON.stringify({ name: category })
        })
            .then(res => res.json())
            .then(responce => responce)
            .catch(error => error)
        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}

export const removeCategory = async (id: string) => {
    try {
        const res = await fetch(`${API}/api/deleteCategory/${id}`, {
            method: "delete", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`,
            }
        })
            .then(res => res.json())
            .then(responce => responce)
            .catch(error => error)

        return res
    } catch (error) {
        GetErrorMessage(error)
    }

}