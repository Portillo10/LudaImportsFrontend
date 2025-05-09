export interface ISellerPricing {
  store_id?: string;
  seller_id?: string;
  fixedCosts: number;
  profitRanges: PercentRange[];
  fixedCostsRanges: PercentRange[];
}

export interface PercentRange {
  range: { from: number; to: number | null };
  percentage: number;
}
