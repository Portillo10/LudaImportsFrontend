import { ISellerPricing } from "../types/sellerPricing";
import apiClient from "./apiClient";

type LinkStoreRequest = {
  client_id: string;
  client_secret: string;
  seller_id: string;
  alias: string;
};

const store = {
  async linkStore({
    client_id,
    client_secret,
    seller_id,
    alias,
  }: LinkStoreRequest) {
    const response = await apiClient.post("/api/link-store", {
      client_id,
      client_secret,
      seller_id,
      alias,
    });
    return response.data;
  },
  async linkStoreSuccess(code: string, data: any) {
    const response = await apiClient.post(`/link-store?code=${code}`, data);
    return response.data;
  },

  async getStores() {
    const response = await apiClient.get("/stores");
    return response.data;
  },

  async getStoresByUser(user_id: string) {
    const response = await apiClient.get(`/stores/user/${user_id}`);
    return response.data;
  },

  async sincronizeStore(store_id: string) {
    const response = await apiClient.put(`/api/store/${store_id}/sincronize`);
    return response.data;
  },

  async transferProducts(origin_store_id: string, target_store_id: string) {
    const response = await apiClient.post(
      `/stores/${origin_store_id}/transfer-to/${target_store_id}`
    );

    return response.data;
  },

  async deleteAllItems(store_id: string) {
    const response = await apiClient.delete(`/stores/${store_id}/items/all`, {
      timeout: 60000,
    });
    return response.data;
  },

  async getPendingPublications() {
    return (await apiClient.get(`/stores/posting/pending`, { timeout: 20000 }))
      .data;
  },
  async getPostingProgress() {
    const response = await apiClient.get("/stores/posting/progress");
    return response.data;
  },
  async getOmitedPubs() {
    const response = await apiClient.get("/stores/posting/omited", {
      timeout: 20000,
    });
    return response.data;
  },
  async savePricing(data: any) {
    const response = await apiClient.post("/stores/pricing", data);
    return response.data;
  },
  async getPricing(user_id: string) {
    const response = await apiClient.get(`/stores/pricing/${user_id}`);

    const data: ISellerPricing = response.data.result;
    return data;
  },
};

export default store;
