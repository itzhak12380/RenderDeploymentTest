import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { globalState } from '../../features/globalState/GlobalState'
import { Order } from '../../../Types/cartType'
import { ORDER_INITIALSTATE } from '../../../Types/initialState'
// const initialState:Order = {
//     address: {
//         city: "string ",
//         country_code: " string ",
//         line1: "string ",
//         postal_code: "string ",
//         recipient_name: "string ",
//         state: "string ",
//     },
//     cart: [
//         {
//             product_id: "string",
//             title: "string",
//             price: 0,
//             description: "string",
//             content: "string",
//             images: { url: "string", public_id: "string" },
//             category: "string",
//             checked: false,
//             sold: 0,
//             _id: "string",
//             quantity: 0,
//         },
//     ],
//     createdAt: "string",
//     email: "string",
//     name: "string",
//     paymentID: "string",
//     status: "string",
//     updatedAt: "string",
//     user_id: "string",
//     __v: 0,
//     _id: "string",
// }
function OrderDetails() {
    const state = useContext(globalState)
    const { history } = state!.userAPI.history
    const [orderDetails, setorderDetails] = useState<Order>(ORDER_INITIALSTATE)
    const params = useParams()
    useEffect(() => {
        if (params.id) {
            history.forEach((item: Order) => {
                if (item._id === params.id) {
                    setorderDetails(item)
                }
            });
        }
    }, [])
    if (orderDetails.cart.length === 0) return null
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal code</th>
                        <th>Country code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails?.address?.recipient_name}</td>
                        <td>{orderDetails?.address?.line1 + " - " + orderDetails?.address?.city}</td>
                        <td>{orderDetails?.address?.postal_code}</td>
                        <td>{orderDetails?.address?.country_code}</td>
                    </tr>
                </tbody>
            </table>
            <table style={{ margin: '30px 0px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>products</th>
                        <th>quantity</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td><img src={item.images.url} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>$ {item.price * item.quantity}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderDetails
