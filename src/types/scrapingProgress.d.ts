import { Progress } from "./apiResponses";

export interface ScrapingProgress extends Progress {
  storeAlias?: string;
  targetStore?: string;
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
