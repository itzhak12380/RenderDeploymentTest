import { createContext } from 'react'
import ProductApi from '../stateManger/ProductState'
import UserAPI from '../stateManger/UserState'
import CategoriesAPI from '../stateManger/CategoriesState'

export const globalState = createContext()

export const DataProvider = ({ children }) => {

    const STATE = {
        productsAPI: ProductApi(),
        userAPI: UserAPI(),
        categoriesAPI: CategoriesAPI(),
    }
    return (
        <globalState.Provider value={STATE}>
            {children}
        </globalState.Provider>
    )
}
