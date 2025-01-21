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

export interface UpdatingProgressResponse {
  trackingProgress: TrackingProgress;
  updatingProgress: UpdatingProgress;
  singleProgress: ISingleTrackingProgress;
}

type TrackingProgress = {
  compareCount: number;
  updatedCount: number;
  usedCredits: number;
  tasksToUpdate: number;
  updatedTasksCount: number;
  status: "stopped" | "running";
};

interface ISingleTrackingProgress {
  updatedCount: number;
  productsToUpdate: number;
  status: string;
  errors: any[];
}

type UpdatingProgress = {
  progress: {
    _id: string;
    alias: string;
    updatedCount: number;
    errorsCount: number;
    updatedComplete: boolean;
    inProgress: boolean;
    error?: string;
  }[];
  status: "stopped" | "running";
};

type Attribute = {
  id: string;
  name?: string;
  value_id: string | null;
  value_name: string;
  values?: AttributeValue[];
  value_type?: string;
};

export interface ICategoryOption {
  domain_id: string;
  domain_name: string;
  category_id: string;
  category_name: string;
  attributes: Attribute[];
}
