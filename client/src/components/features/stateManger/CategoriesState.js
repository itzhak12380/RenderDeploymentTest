import {useState,useEffect} from 'react'
import { getCategories } from '../../service/categoryService'
function CategoriesAPI() {
    const [categories, setcategories] = useState([])
    const [callsback, setcallsback] = useState()
    useEffect( async() => {
        const Categories = await getCategories()
        setcategories(Categories);
    }, [callsback])
    return {
        categories:[categories,setcategories],
        callback:[callsback, setcallsback]
    }
}

export default CategoriesAPI
