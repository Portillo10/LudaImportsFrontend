export interface IScrapingProgress {
  total: number;
  storeAlias?: string;
  usedCredits: number;
  targetStore?: ObjectId;
  target: "sku" | "product";
  scrapedProductsCount: number;
  omitedProducts: OmitedProduct[];
  status: "running" | "loading" | "paused" | "stopped";
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
