export interface IProduct {
    product_id: string;
    title: string;
    price: number;
    description?: string;
    content: string;
    images: { public_id: string; url: string };
    category: string;
    checked: boolean;
    sold: number;
    _id: string ;
    quantity: number;
    never?:string;
}
export interface IsImage {
    isImage?: boolean,
    public_id: string,
    url?: string
}``
export const INITIALSTATE = {
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
    quantity: 0
}
