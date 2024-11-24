export interface IProduct {
  sku: string;
  price: number;
  weight: number;
  dimensions: string;
  title: string;
  category_id: string;
  state: ProductState;
  isPrime?: boolean;
}

export type ProductState =
  | "active"
  | "error"
  | "omited"
  | "updated"
  | "pending"
  | "revised"
  | "forbbiden";
