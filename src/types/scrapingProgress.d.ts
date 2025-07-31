import { Progress } from "./apiResponses";

export interface ScrapingProgress extends Progress {
  storeAlias?: string;
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
