import {
  CalcPriceResponse,
  UpdatingProgressResponse,
} from "../types/apiResponses";
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

  async calcPrice(store_id: string, sku: string) {
    const response = await apiClient.get(
      `/price/store/${store_id}/calc-price?sku=${sku}`
    );
    const responseData: CalcPriceResponse | any = response.data;
    return { data: responseData, status: response.status };
  },
};

export default priceService;
