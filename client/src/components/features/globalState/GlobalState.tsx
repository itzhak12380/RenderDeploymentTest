import React, { createContext } from 'react'
import ProductApi from '../stateManger/ProductState'
import UserAPI from '../stateManger/UserState'
import CategoriesAPI from '../stateManger/CategoriesState'
import { IProduct } from '../../Types/products'


interface IGlobalState {

    productsAPI: {
        products: {
            products: IProduct[];
            setproduct: React.Dispatch<React.SetStateAction<IProduct[]>>;
        };
        productCall: {
            productCall: Boolean;
            setproductCall: React.Dispatch<React.SetStateAction<Boolean>>
        };
        page: {
            page: number;
            setPage: React.Dispatch<React.SetStateAction<number>>;
        };
        result: {
            result: number;
            setResult: React.Dispatch<React.SetStateAction<number>>;
        };
        category: {
            category: string;
            setcategory: React.Dispatch<React.SetStateAction<string>>
        };
        search: {
            search: string;
            setSearch: React.Dispatch<React.SetStateAction<string>>
        };
        sort: {
            sort: string;
            setSort: React.Dispatch<React.SetStateAction<string>>
        };
    };
    userAPI: {
        isLogged: any,
        isAdmin: any,
        cart: any,
        ADDCART: any,
        history: any
    };
    categoriesAPI: {
        categories: any,
        callback: any
    };

}
export const globalState = createContext<IGlobalState | null>(null)

export const DataProvider: React.FC = ({ children }) => {

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
