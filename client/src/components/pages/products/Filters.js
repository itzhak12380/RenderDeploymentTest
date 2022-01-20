import React, { useContext, useCallback } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import debounce from 'lodash.debounce'
function Filters() {
    const state = useContext(globalState)
    const [categories, setcategories] = state.categoriesAPI.categories
    const [page, setPage] = state.productsAPI.page
    const [category, setcategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const handleCategory = e => {
        setcategory(e.target.value)
        setSearch("")
    }
    const HnadleInput = (e) => {
        return setSearch((search) => search = e.target.value.toLocaleLowerCase())
    }

    const DebounceHnadleInput = debounce(HnadleInput, 1000)
    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters:</span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value="">All Products</option>
                    {
                        categories.map((category) => {
                            return <option value={"category=" + category._id} key={category._id} >{category.name}</option>
                        })
                    }
                </select>
            </div>
            <input type="text" placeholder="Enter your search" onChange={DebounceHnadleInput} />

            <div className="row sort">
                <span>Sort By:</span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sales</option>
                    <option value="sort=-price">price: High-Low</option>
                    <option value="sort=price">price: Low-High</option>

                </select>
            </div>
        </div>
    )
}

export default Filters
