import { useContext, useState, useEffect } from 'react'
import { globalState } from '../../features/globalState/GlobalState'
import PaypalButton from './PaypalButton'
import { PostPayment, AddToCart } from '../../service/cartService'
import './cart.css'
import { IProduct } from '../../Types/products'
import { Payment } from '../../Types/cartType'


function Cart() {
    const state = useContext(globalState)
    const [cart, setCart] = state.userAPI.cart
    const [productCall, setproductCall] = state.productsAPI.productCall
    const [total, settotal] = useState<number>(0)
    function GetAll(cart: Array<IProduct>) {
        try {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            settotal(total)
        } catch (error) {

        }

    }
    const increment = (id: string, cart: Array<IProduct>) => {
        try {
            cart.forEach(item => {
                if (item._id === id) {
                    item.quantity += 1
                }
            });
            setCart([...cart])
            AddToCart(cart)
            GetAll(cart)
        } catch (error) {
            alert(error)
        }

    }


    const decrement = (id: string, cart: Array<IProduct>) => {
        try {
            cart.forEach(item => {
                if (item._id === id) {
                    item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
                }
            });
            setCart([...cart])
            AddToCart(cart)
            GetAll(cart)
        } catch (error) {
            alert(error)
        }

    }


    const removeProduct = (id: string, cart: Array<IProduct>) => {
        try {
            if (window.confirm("do you want to delete this product?")) {
                cart.forEach((item, index) => {
                    if (item._id === id) {
                        cart.splice(index, 1)
                    }
                })
                setCart([...cart])
                AddToCart(cart)
            }

        } catch (error) {
            alert(error)
        }

    }


    const tranSuccess = async (payment: Payment) => {
        try {
            const { paymentID, address } = payment
            await PostPayment(cart, paymentID, address)
            setCart([])
            AddToCart([])
            alert("you have successfully placed an order.")
            setproductCall(!productCall)
        } catch (error) {
            alert(error)
        }

    }


    useEffect(() => {
        GetAll(cart);
    }, [cart])

    if (cart.length === 0) {
        return <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart empty</h2>
    }
    return (
        <div>
            {
                cart.map((product: IProduct) => {
                    return (<div className="detail" key={product._id}>
                        <img src={product.images.url}
                            alt=""
                        />
                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <span>${product.price * product.quantity}  </span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                        </div>
                        <div className="amount">
                            <button onClick={() => decrement(product._id, cart)}> - </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id, cart)}> + </button>
                        </div>
                        <div className="delete" onClick={() => removeProduct(product._id, cart)}>
                            X
                        </div>
                    </div>)
                })
            }
            <div className="total">
                <h3>Total: ${total}</h3>
                < PaypalButton total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart
