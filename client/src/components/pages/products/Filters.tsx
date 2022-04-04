import React, { useContext } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import debounce from 'lodash.debounce'
import { ICategories } from '../../../Types/categoriesType'
function Filters() {
    const state = useContext(globalState)
    const { categories, setcategories } = state!.categoriesAPI?.categories
    const { category, setcategory } = state!.productsAPI.category
    const { sort, setSort } = state!.productsAPI.sort
    const { setSearch } = state!.productsAPI.search
    const handleCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        setcategory(e.currentTarget.value)
        setSearch("")
    }

    const HnadleInput = async (e: React.FormEvent<HTMLInputElement>) => {
        let lowerCaseValue = e.currentTarget.value.toLocaleLowerCase()
        DebounceHnadleInput(lowerCaseValue)
    }

    const DebounceHnadleInput = debounce((lowerCaseValue) => {

        setSearch((search: string) => search = lowerCaseValue)
    }, 1000)
    return (
        <div className="filter_menu">
            <input type="text" placeholder="Enter your search" onChange={HnadleInput} />

            <div className="row">
                <span>Filters:</span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value="">All Products</option>
                    {
                        categories.map((category: ICategories) => {
                            return <option value={"category=" + category._id} key={category._id} >{category.name}</option>
                        })
                    }
                </select>
            </div>

            <div className="row sort">
                <span>Sort By:</span>
                <select value={sort} onChange={e => setSort(e.currentTarget.value)}>
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
