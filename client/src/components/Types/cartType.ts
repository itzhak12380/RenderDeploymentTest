import {IProduct} from '../Types/products'
export interface Payment {
    paymentID: string;
    address: string
}

export interface Order {
    address: {
        city: string | null | undefined;
        country_code: string | null;
        line1: string | null;
        postal_code: string | null;
        recipient_name: string | null;
        state: string | null;
    } | null | undefined;
    cart: Array<IProduct>;
    createdAt: string;
    email: string;
    name: string;
    paymentID: string;
    status: string;
    updatedAt: string;
    user_id: string;
    __v: number;
    _id: string;
}