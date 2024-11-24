import { CalcPriceResponse } from "../types/apiResponses";
import apiClient from "./apiClient";

const mercadoLibreService = {
  async calcPrice(storeId: string, sku: string) {
    const response = await apiClient.get(
      `/api/store/${storeId}/calc-price?sku=${sku}`,
      { timeout: 200000 }
    );
    const responseData: CalcPriceResponse | any = response.data;
    return { data: responseData, status: response.status };
  },

  async getUsdRate() {
    const response = await apiClient.get("/api/usd-rate");
    const responseData: { usdRate: number } = response.data;
    return responseData;
  },

  async getCategories() {
    const response = await apiClient.get("/api/categories");
    return response.data;
  },

  async predictCategory(sku: string, store_id: string) {
    const response = await apiClient.get(
      `/api/store/${store_id}/predict?sku=${sku}`
    );
    return response.data;
  },
};

export default mercadoLibreService;
