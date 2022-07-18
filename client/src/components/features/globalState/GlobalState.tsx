import React, { createContext } from 'react'
import ProductApi from '../stateManger/ProductState'
import UserAPI from '../stateManger/UserState'
import CategoriesAPI from '../stateManger/CategoriesState'
import { IProduct } from '../../../Types/products'
import { Order } from '../../../Types/cartType'
import { ICategories } from '../../../Types/categoriesType'
interface IGlobalState {

    productsAPI: {
        products: {
            products: IProduct[];
            setproduct: React.Dispatch<React.SetStateAction<IProduct[]>>;
        };
        productCall: {
            productCall: boolean;
            setproductCall: React.Dispatch<React.SetStateAction<boolean>>
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
        isLogged: {
            isLogged: boolean;
            setisLogged: React.Dispatch<React.SetStateAction<boolean>>;
        },
        isAdmin: {
            isAdmin: boolean;
            setisAdmin: React.Dispatch<React.SetStateAction<boolean>>;
        },
        cart: {
            Cart: IProduct[];
            setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
        },
        ADDCART: Function,
        history: {
            history: Order[];
            sethistory: React.Dispatch<React.SetStateAction<Order[]>>;
        }
    };
    categoriesAPI: {
        categories:
        {
            categories: ICategories[];
            setcategories: React.Dispatch<React.SetStateAction<ICategories[]>>;
        },
        callback: {
            callsback: boolean;
            setcallsback: React.Dispatch<React.SetStateAction<boolean>>;
        }
    };

}
export const globalState = createContext<IGlobalState | null>(null)

export const DataProvider: React.FC = ({ children }) => {

    const STATE = {
        productsAPI: ProductApi(),
        userAPI: UserAPI(),
        categoriesAPI: CategoriesAPI(),
    }
    // isLogin

    return (
        <globalState.Provider value={STATE}>
            {children}
        </globalState.Provider>
    )
}
