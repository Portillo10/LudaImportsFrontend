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

  async getCategories() {
    const response = await apiClient.get("/api/categories");
    return response.data;
  },

  async predictCategory(
    store_id: string,
    q?: string,
    sku?: string,
    limit: number = 1
  ) {
    const response = await apiClient.get(
      `/api/store/${store_id}/predict?${sku ? `sku=${sku}` : ""}${q && !sku ? `q=${q}` : ""}&limit=${limit}`
    );
    return response.data;
  },

  async transferProducts(data: any) {
    const response = await apiClient.post("/api/store/transfer-products", data);
    return response.data;
  },

  async postPending(store_id: string) {
    const response = await apiClient.post(`/api/store/${store_id}/posting`);

    return response.data;
  },

  async getPostingProgressByStore(store_id: string) {
    const response = await apiClient.get(`/api/store/${store_id}/posting`);
    return response.data;
  },

  async syncStore(store_id: string) {
    const response = await apiClient.put(`/api/store/${store_id}/sincronize`);
    return response.data;
  },

  async getSyncStoreProgress(store_id: string) {
    const response = await apiClient.get(`/api/store/${store_id}/sincronize`);
    return response.data;
  },

  async deleteForbbidenProducts(store_id: string) {
    const response = await apiClient.post(
      `/api/store/${store_id}/delete-forbbiden`
    );
    return response.data;
  },
};

export default mercadoLibreService;
