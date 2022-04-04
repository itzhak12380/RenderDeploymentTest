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
  _id: string;
  quantity: number;
  never?: string;
}
export interface IProductImage {
  isImage?: boolean;
  public_id: string;
  url?: string;
}


