import{ useState, useEffect } from 'react'
function ProductApi() {
    const [products, setproduct] = useState([])
    const [productCall, setproductCall] = useState(false)
    const [category, setcategory] = useState("")
    const [sort, setSort] = useState("")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    return {
        products: { products, setproduct },
        productCall:[productCall, setproductCall],
        category:[category, setcategory],
        sort:[sort, setSort],
        search: [search, setSearch],
        page:[page, setPage] ,
        result:[result, setResult] 
    }
}

export default ProductApi
