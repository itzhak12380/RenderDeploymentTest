import React,{useState,useEffect} from 'react'

function CategoriesAPI() {
    const [categories, setcategories] = useState([])
    const [callsback, setcallsback] = useState()
    useEffect( async() => {
        const getCategories = await fetch("http://localhost:8080/api/category", {
            method: "get", headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(responce => responce)
        .catch(error => error)
        setcategories(getCategories);
    }, [callsback])
    return {
        categories:[categories,setcategories],
        callback:[callsback, setcallsback]
    }
}

export default CategoriesAPI
