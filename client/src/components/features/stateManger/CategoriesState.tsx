import { useState, useEffect } from 'react'
import { getCategories } from '../../service/categoryService'
interface Catgorie {
    name: string, _id: string
}
function CategoriesAPI() {
    const [categories, setcategories] = useState<Array<Catgorie>>([])
    const [callsback, setcallsback] = useState<Boolean>(false)
    useEffect(() => {
        const GetAllCategories = async () => {
            setcategories(await getCategories());
        }
        GetAllCategories()
    }, [callsback])
    return {
        categories: [categories, setcategories],
        callback: [callsback, setcallsback]
    } as const
}

export default CategoriesAPI
