import { API } from "./api-service"
export const getHistory = async (isAdmin) => {
    if(isAdmin){
        const res = await fetch(`${API}/api/payment`, {
            method: "get", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`
            }
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        return res
    }
    else{
          const res = await fetch(`${API}/user/history`, {
            method: "get", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.accessToken}`
            }
        }).then(res => res.json()).then(responce => responce).catch(error => error)
        return res
    }
      
   
}