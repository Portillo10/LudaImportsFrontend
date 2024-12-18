export interface IScrapingProgress {
  target: "sku" | "product";
  scrapedSkuCount: number;
  scrapedProductsCount: number;
  omitedProducts: OmitedProduct[];
  status: "running" | "loading" | "paused" | "stopped";
  targetStore?: ObjectId;
}

type OmitedProduct = {
  sku: string;
  reason: string | null;
};
