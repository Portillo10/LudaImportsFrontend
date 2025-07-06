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
    const response = await apiClient.get("/price/usd-rate", { timeout: 20000 });
    const responseData: { usdRate: number } = response.data;
    return responseData;
  },
  async getUpdateProgress() {
    const response = await apiClient.get("/price/update");
    const responseData: UpdatingProgressResponse = response.data;
    return responseData;
  },

  async calcPrice(params: any) {
    const response = await apiClient.get("/price/calc-price", {
      timeout: 120000,
      params,
    });
    const responseData: CalcPriceResponse | any = response.data;
    return { data: responseData, status: response.status };
  },

  async getUpdateHistory() {
    const response = await apiClient.get("/price/update/history");
    const { data, status } = response;
    return { data, status };
  },
};

export default priceService;
