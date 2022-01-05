import React, { useContext,useState } from 'react'
import { Link } from "react-router-dom";
import Cart from './icon/cart.svg'
import Menu from './icon/bars-solid.svg'
import Close from './icon/times-solid.svg'
import './header.css'
import { globalState } from '../globalState/GlobalState';
import {API} from '../../service/api-service'

function Header() {
    const state = useContext(globalState)
    const [isLogged, setisLogged] = state.userAPI.isLogged
    const [isAdmin, setisAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState("")

    const logoutUser = async () => {
        await fetch(`${API}/user/logout`, { method: "get", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(responce => responce)
            .catch(error => error)
        localStorage.clear()
        window.location.href = "/"
    }
    const AdminRouter = () => {
        return (
            <>
                <li><Link to="/create_product"> Create Product </Link></li>
                <li><Link to="/category" >Categories</Link></li>
            </>
        )
    }
    const LoggedRouter = () => {
        return (
            <>
                <li><Link to="/history"> History </Link></li>
                <li><Link to="/" onClick={logoutUser}>logout</Link></li>
            </>
        )
    }
    const styleMenu = {
        left:menu ? 0 : "-100%"
    }
    return (
        <header>
            <div className="menu" onClick={()=> setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to='/'>{isAdmin ? "Admin" : "BuyMe"}</Link>
                </h1>
            </div>
            <ul style={styleMenu} >
                <li><Link to="/">{isAdmin ? "products" : "shop"} </Link></li>
                {isAdmin &&  <AdminRouter/> }
                {
                    isLogged ? <LoggedRouter/> : <li><Link to="/Login"> login or Register </Link></li>
                }
                <li onClick={()=> setMenu(!menu)} ><img src={Close} alt="" width="30" className="menu" /></li>
            </ul>
            {
                isAdmin ? "" : <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }

        </header>
    )
}

export default Header
