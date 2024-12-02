import { UpdatingProgressResponse } from "../types/apiResponses";
import apiClient from "./apiClient";

const priceService = {
  async updatePrices(store_ids: string[], data: any) {
    const response = await apiClient.post("/price/update", {
      store_ids,
      ...data,
    });

    return response.data;
  },
  async getUsdRate() {
    const response = await apiClient.get("/price/usd-rate");
    const responseData: { usdRate: number } = response.data;
    return responseData;
  },
  async getUpdateProgress() {
    const response = await apiClient.get("/price/update");
    const responseData: UpdatingProgressResponse = response.data;
    return responseData;
  },
};

export default priceService;
