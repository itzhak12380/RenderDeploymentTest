import { useState, useEffect } from 'react'
import { userInfo, buyProduct } from '../../service/userService'
function UserAPI() {
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [Cart, setCart] = useState([])
    const [history, sethistory] = useState([])

    useEffect(() => {
        if (localStorage.accessToken) {
            const getUser = async () => {
                try {
                    const res = await userInfo()
                    if (res.user) {
                        setisLogged(true)
                        res.user.role === 1 ? setisAdmin(true) : setisAdmin(false)
                        setCart(res.user.cart)
                    }
                    else {
                        alert("your access token has expierd please sign in")
                        localStorage.clear()
                        window.location.href = "/"
                    }
                } catch (error) {
                    setisLogged(false)
                }
            }

            getUser()
        }

    }, [localStorage.accessToken])


    const addCart = async (product) => {
        if (!isLogged) return alert('please login to continue buying')

        const check = Cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            setCart([...Cart, { ...product, quantity: 1 }])
            await buyProduct(Cart, product)
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
