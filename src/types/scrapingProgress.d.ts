import { Progress } from "./apiResponses";

export interface ScrapingProgress extends Progress {
  storeId?: string;
  publishedCount: number;
  step: "sku-extraction" | "product-extraction" | null;
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
