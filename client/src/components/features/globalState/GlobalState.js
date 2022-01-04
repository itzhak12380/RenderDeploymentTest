import React, { createContext, useState, useEffect } from 'react'
import ProductApi from '../api/ProductApi'
import UserAPI from '../api/UserAPI.js'
import CategoriesAPI from '../api/CategoriesAPI'
export const globalState = createContext()

export const DataProvider = ({ children }) => {
    // const firstLogin = localStorage.getItem('firstLogin') // for refreshToken
    useEffect(() => {
       
    }, [])
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