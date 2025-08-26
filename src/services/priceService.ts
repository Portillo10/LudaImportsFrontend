import {
  CalcPriceResponse,
  UpdatingProgressResponse,
} from "../types/apiResponses";
import apiClient from "./apiClient";

const baseUrl = "/prices";

const priceService = {
  async updateAmazonPrices(store_ids: string[], data: any) {
    const response = await apiClient.post(`${baseUrl}/sync/amazon`, {
      store_ids,
      ...data,
    });

    return response.data;
  },

  async updateMercadoLibrePrices(store_ids: string[]) {
    const response = await apiClient.post(`${baseUrl}/sync/mercadolibre`, {
      store_ids,
    });

    return response.data;
  },

  async updatePrices(store_ids: string[], data: any) {
    const response = await apiClient.post(`${baseUrl}/update`, {
      store_ids,
      ...data,
    });

    return response.data;
  },

  async getUsdRate() {
    const response = await apiClient.get(`${baseUrl}/usd-rate`, {
      timeout: 20000,
    });
    const responseData: { usdRate: number } = response.data;
    return responseData;
  },

  async getUpdateProgress() {
    const response = await apiClient.get(`${baseUrl}/update`);
    const responseData: UpdatingProgressResponse = response.data;
    return responseData;
  },

  async calcPrice(params: any) {
    const response = await apiClient.get(`${baseUrl}/calc-price`, {
      timeout: 120000,
      params,
    });
    const responseData: CalcPriceResponse | any = response.data;
    return { data: responseData, status: response.status };
  },

  async patchUpdatingProgress(status: string) {
    const response = await apiClient.patch(
      `${baseUrl}/sync/amazon`,
      {},
      { params: { status } }
    );
    return response.data;
  },

  async getUpdateHistory() {
    const response = await apiClient.get(`${baseUrl}/update/history`);
    const { data, status } = response;
    return { data, status };
  },
};

export default priceService;
