import{ useState } from 'react'
interface ProductInteface {
    product_id: string,
    title: string,
    price: number,
    description?: string,
    content: string,
    images: {url:string ; imageurl:string},
    category: string,
    checked: boolean,
    sold: number,
    _id: string,
    quantity: number
}
function ProductApi() {
    const [products, setproduct] = useState<Array<ProductInteface>>([])
    const [productCall, setproductCall] = useState<Boolean>(false)
    const [category, setcategory] = useState<String>("")
    const [sort, setSort] = useState<String>("")
    const [search, setSearch] = useState<String>("")
    const [page, setPage] = useState<Number>(1)
    const [result, setResult] = useState<Number>(0)
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
