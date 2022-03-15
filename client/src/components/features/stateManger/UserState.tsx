import { useState, useEffect } from 'react'
import { userInfo, buyProduct } from '../../service/userService'
import { IProduct } from '../../Types/products'

function UserAPI() {
    const [isLogged, setisLogged] = useState<Boolean>(false)
    const [isAdmin, setisAdmin] = useState<Boolean>(false)
    const [Cart, setCart] = useState<Array<IProduct>>([])
    const [history, sethistory] = useState<Array<object>>([])

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


    const addCart = async (product: IProduct) => {
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
    } as const
}

export default UserAPI
