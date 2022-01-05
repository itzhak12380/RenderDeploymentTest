import React, { useContext,navigator,useRef,useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import Categories from '../categories/Categories'

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
    function isIOS() {
        return (
          (/iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
          !window.MSStream
        );
      }
    function getIOSInputEventHandlers() {
        if (isIOS()) {
          return {};
        }
      
        return {
          onTouchStart: e => {
            e.currentTarget.style.fontSize = "16px";
          },
          onBlur: e => {
            e.currentTarget.style.fontSize = "";
          }
        };
      }
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
            <input type="text" value={search} placeholder="Enter your search" onChange={e => setSearch(e.target.value.toLocaleLowerCase())} />

            <div className="row sort">
                <span>Sort By:</span>
                <select value={sort} onBlur={getIOSInputEventHandlers}  onChange={e => setSort(e.target.value)}>
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
