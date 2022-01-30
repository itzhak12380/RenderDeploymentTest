import React from "react";
import { isExportDeclaration } from "typescript";

export interface ProductInter {
    product_id: string;
    title: string;
    price: number;
    description?: string;
    content: string;
    images: {url:string ; imageurl:string};
    category: string;
    checked: boolean;
    sold: number;
    _id: string;
    quantity: number
}
export interface Payment {
    paymentID: String;
    address: String
}
// let cart: Array<ProductInter> = [{
//     product_id: "string",
//     title: "string",
//     price: 15,
//     description: 'string',
//     content: "",
//     images: { url: 'dsfsdf' },
//     category: "string;",
//     checked: true,
//     sold: 20,
//     _id: "string",
//     quantity: 6
// }];

// export function getAll(settotal: Function ,cart:Array<ProductInter>) {
//     const total = cart.reduce((prev, item) => {
//         return prev + (item.price * item.quantity)
//     }, 0)
//     settotal(total)
// }
// export const increment = (setCart: Function, addToCart: Function, getAll: Function, id: string,cart:Array<ProductInter>) => {
//     cart.forEach(item => {
//         if (item._id === id) {
//             item.quantity += 1
//         }
//     });
//     setCart([...cart])
//     addToCart(cart)
//     getAll()
// }
// export const decrement = (setCart: Function, addToCart: Function, getAll: Function, settotal: Function, id: string,cart:Array<ProductInter>) => {
//     cart.forEach(item => {
//         if (item._id === id) {
//             item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
//         }
//     });
//     setCart([...cart])
//     addToCart(cart)
//     getAll(settotal)
// }


// export const removeProduct = (setCart: Function, addToCart: Function, id: string,cart:Array<ProductInter>) => {
//     if (window.confirm("do you want to delete this product?")) {
//         cart.forEach((item, index) => {
//             if (item._id === id) {
//                 cart.splice(index, 1)
//             }
//         })
//         setCart([...cart])
//         addToCart(cart)
//     }
// }

// export const tranSuccess = async (payment:Payment,setCart: Function, addToCart: Function, setproductCall: Function, productCall: boolean, postPayment: Function,cart:Array<ProductInter>) => {
//     const { paymentID, address } = payment
//     await postPayment(cart, paymentID, address)
//     setCart([])
//     addToCart([])
//     alert("you have successfully placed an order.")
//     setproductCall(!productCall)
// }
