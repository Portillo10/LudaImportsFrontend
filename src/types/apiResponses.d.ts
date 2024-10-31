import { IStore } from "./store";
import { IUser } from "./user";

export interface LogInResponse {
  access_token: string;
  user: IUser;
  error?: string;
}

export interface ProfileResponse {
  profile: IUser;
}

export interface RegisterUserResponse {
  userId: string;
}

export interface CalcPriceResponse {
  price: number;
  amazonShipment: number;
  purchaseTax: number;
  totalPurchase: number;
  profit: number;
  internationalShipment: number;
  customShipment: number;
  importTax: number;
  fixedCosts: number;
  totalUsdPurchase: number;
  usdRate: number;
  totalCopPurchase: number;
  mlShipment: number;
  mlCommission: number;
  nationalSalesTax: number;
  unitPrice: number;
  weight: number;
  profitPercent: number;
}
