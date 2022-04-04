import { useState } from 'react'
import { IProduct } from '../../../Types/products'

function ProductApi() {
    const [products, setproduct] = useState<Array<IProduct>>([])
    const [productCall, setproductCall] = useState<boolean>(false)
    const [category, setcategory] = useState<string>("")
    const [sort, setSort] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [result, setResult] = useState<number>(0)
    return {
        products: { products, setproduct },
        productCall: { productCall, setproductCall },
        category: { category, setcategory },
        sort: { sort, setSort },
        search: { search, setSearch },
        page: { page, setPage },
        result: { result, setResult }
    }
}

export default ProductApi
