import { useState, useEffect } from 'react'
import { getCategories } from '../../../service/categoryService'
import { ICategories } from '../../../Types/categoriesType'

function CategoriesAPI() {
    const [categories, setcategories] = useState<Array<ICategories>>([])
    const [callsback, setcallsback] = useState<boolean>(false)
    useEffect(() => {
        const GetAllCategories = async () => {
            setcategories(await getCategories());
        }
        GetAllCategories()
    }, [callsback])
    return {
        categories: { categories, setcategories },
        callback: { callsback, setcallsback }
    }
}

export default CategoriesAPI
