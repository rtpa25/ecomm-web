/** @format */

export default interface ListAllProductsResType {
  result: getProductResType[];
}

export interface getProductResType {
  product: product;
  available_sizes: string[];
  catagories: string[];
}

export interface product {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  image_id: string;
  price: string;
}
