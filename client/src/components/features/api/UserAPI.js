import { useState, useEffect } from 'react'
import {API} from '../../service/api-service'

function UserAPI() {
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [Cart, setCart] = useState([])
    const [history, sethistory] = useState([])

    useEffect(() => {
        if (localStorage.accessToken) {
            const token = localStorage.accessToken
            const getUser = async () => {
                try {
                    const res = await fetch(`${API}/user/info`, {
                        method: "get", headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }).then(res => res.json()).then(responce => responce).catch(error => error)
                        setisLogged(true)
                        res.user.role === 1 ? setisAdmin(true) : setisAdmin(false)
                        setCart(res.user.cart)

                } catch (error) {
                    setisLogged(false)          
                }
            }

            getUser()
        }
        else {
            console.log("error line 35");
        }
    }, [localStorage.accessToken])
 

    const addCart = async (product) => {
        if (!isLogged) return alert('please login to continue buying')

        const check = Cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            setCart([...Cart, { ...product, quantity: 1 }])
            await fetch(`${API}/user/addcart`, {
                method: "put", headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.accessToken}`,
                },
                body: JSON.stringify([...Cart, { ...product, quantity: 1 }])
            }).then(res => res.json()).then(responce => responce).catch(error => error)
        } else {
            alert("this product has been added to cart")
        }
    }
    return {
        isLogged: [isLogged, setisLogged],
        isAdmin: [isAdmin, setisAdmin],
        cart: [Cart, setCart],
        addCart: addCart,
        history: [history, sethistory]
    }
}

export default UserAPI
