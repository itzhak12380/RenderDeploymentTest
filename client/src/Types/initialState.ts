import { Order } from "./cartType";
import { IProduct } from "./products";

export const ORDER_INITIALSTATE: Order = {
  address: {
    city: "string ",
    country_code: " string ",
    line1: "string ",
    postal_code: "string ",
    recipient_name: "string ",
    state: "string ",
  },
  cart: [
    {
      product_id: "string",
      title: "string",
      price: 0,
      description: "string",
      content: "string",
      images: { url: "string", public_id: "string" },
      category: "string",
      checked: false,
      sold: 0,
      _id: "string",
      quantity: 0,
    },
  ],
  createdAt: "string",
  email: "string",
  name: "string",
  paymentID: "string",
  status: "string",
  updatedAt: "string",
  user_id: "string",
  __v: 0,
  _id: "string",
};

export const  PRODUCT_INITIALSTATE: IProduct = {
    product_id: "",
    title: "",
    price: 120,
    description: "In general, a product is defined as a “thing produced by",
    content: "In general, a product is defined as a “thing produced by labor or effort” or the “result of an act or a process. ” The word “product” stems from the verb “produce”, from the Latin prōdūce(re) “(to) lead or bring forth. ” Since 1575, the word “product” has referred to anything produced.",
    category: "",
    _id: "",
    images: { url: "string", public_id: "string" },
    checked: false,
    sold: 0,
    quantity: 0,
}