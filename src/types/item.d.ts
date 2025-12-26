export interface Item {
  title: string;
  category_id: string;
  description: string;
  price: number;
  pictures: Picture[];
  attributes: ItemAttribute[];
  available_quantity: number;
  currency_id: "COP";
  buying_mode: "buy_it_now";
  listing_type_id: "gold_special";
  condition: "new" | "used" | "not_specified";
  shipping: Shipping;
  sale_terms: SaleTerm[];
  weight?: number;
  dimensions?: string;
  amazonPrice: number;
  shipmentPrice: number;
  manufacturingTime: number;
  warrantyTime: number;
  family_name?: string;
}

export type ItemAttribute = {
  id: string;
  value_name: string;
  required: boolean;
  label: string;
};

type SaleTerm = {
  id: "WARRANTY_TIME" | "WARRANTY_TYPE" | "MANUFACTURING_TIME";
  value_name: "Garantía del vendedor" | string;
};

type Shipping = {
  mode: "me2";
  local_pick_up: false;
  free_shipping: true;
  free_methods: [];
  logistic_type: "xd_drop_off";
  handling_time?: number;
};

export type Picture = {
  source: string;
};
