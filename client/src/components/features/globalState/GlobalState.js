import React, { createContext, useEffect } from 'react'
import ProductApi from '../stateManger/ProductState'
import UserAPI from '../stateManger/UserState.tsx'
import CategoriesAPI from '../stateManger/CategoriesState'
export const globalState = createContext()

export const DataProvider = ({ children }) => {

    const state = {
        productsAPI: ProductApi(),
        userAPI: UserAPI(),
        categoriesAPI:CategoriesAPI(),
    }
  
    return (
        <globalState.Provider value={state}>
            {children}
        </globalState.Provider>
    )
}