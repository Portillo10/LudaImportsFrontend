export interface IProduct {
  sku: string;
  price: number;
  weight: number;
  dimensions: string;
  title: string;
  category_id: string;
  description: string;
  pictures: string[];
  attributes: Attributes;
  condition: "new" | "refurbished";
  state: ProductState;
  tracked?: boolean;
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

export type Attributes = { [key: string]: string | number };

export type Picture = {
  source: string;
};
