export interface IScrapingProgress {
  target: "sku" | "product";
  scrapedSkuCount: number;
  scrapedProductsCount: number;
  omitedProducts: OmitedProduct[];
  productsToScrape: number;
  status: "running" | "loading" | "paused" | "stopped";
  targetStore?: ObjectId;
  storeAlias?: string;
  usedCredits: number;
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
