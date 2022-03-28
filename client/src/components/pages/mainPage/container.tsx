import React, { useContext } from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import Cart from '../cart/Cart'
import Products from '../products/Products'
import Header from '../../features/header/Header'
import Login from '../auth/Login'
import Register from '../auth/Register'
import NotFound from '../not_found/NotFound'
import DetailProduct from '../../features/DeatailProduct/DetailProduct'
import { globalState } from '../../features/globalState/GlobalState'
import OrderHistory from '../History/OrderHistory'
import OrderDetails from '../History/OrderDetails'
import Categories from '../categories/Categories'
import CreateProduct from '../createProduct/CreateProduct'
function Container() {
    const state = useContext(globalState)
    const [isLogged] = state!.userAPI.isLogged
    const [isAdmin] = state!.userAPI.isAdmin
    return (
        <div>
            <Header />
            <div >
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/detail/:id" element={<DetailProduct />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/Login" element={isLogged ? <NotFound /> : < Login />} />
                    <Route path="/Register" element={isLogged ? <NotFound /> : <Register />} />
                    <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />
                    <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
                    <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />


                    <Route path="/history" element={isLogged ? <OrderHistory /> : <NotFound />} />
                    <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}

export default Container
