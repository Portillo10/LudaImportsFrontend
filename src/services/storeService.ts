import { ISellerPricing } from "../types/sellerPricing";
import apiClient from "./apiClient";

type LinkStoreRequest = {
  client_id: string;
  client_secret: string;
  seller_id: string;
  alias: string;
};

const prefix = "/stores";

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
    const response = await apiClient.get(`${prefix}`);
    return response.data;
  },

  async getStoresByUser(user_id: string) {
    const response = await apiClient.get(`${prefix}/user/${user_id}`);
    return response.data;
  },

  async sincronizeStore(store_id: string) {
    const response = await apiClient.put(
      `/api/store/${store_id}/sincronize`,
      {},
      { params: { all_stores: "true" } }
    );
    return response.data;
  },

  async transferProducts(origin_store_id: string, target_store_id: string) {
    const response = await apiClient.post(
      `${prefix}/${origin_store_id}/transfer-to/${target_store_id}`
    );

    return response.data;
  },

  async deleteAllItems(store_id: string) {
    const response = await apiClient.delete(`${prefix}/${store_id}/items/all`, {
      timeout: 60000,
    });
    return response.data;
  },

  async getPendingPublications() {
    return (
      await apiClient.get(`${prefix}/posting/pending`, { timeout: 20000 })
    ).data;
  },

  async startPublications(store_id: string) {
    const url = `${prefix}/${store_id}/publications`;
    const response = await apiClient.post(url);
    return response.data;
  },

  async patchPublications(store_id: string, status: string) {
    const response = await apiClient.patch(
      `${prefix}/${store_id}/publications`,
      {},
      { params: { status } }
    );
    return response.data;
  },

  async getPostingProgress() {
    const response = await apiClient.get(`${prefix}/publications`);
    return response.data.progress;
  },

  async getOmitedPubs() {
    const response = await apiClient.get(`${prefix}/posting/omited`, {
      timeout: 20000,
    });
    return response.data;
  },

  async savePricing(data: any) {
    const response = await apiClient.post(`${prefix}/pricing`, data);
    return response.data;
  },

  async getPricing(user_id: string) {
    const response = await apiClient.get(`${prefix}/pricing/${user_id}`);

    const data: ISellerPricing = response.data.result;
    return data;
  },

  async getItemsCount(store_id: string, filter: any) {
    const response = await apiClient.post(
      `${prefix}/${store_id}/items/search/count`,
      filter
    );
    return response.data;
  },

  async getResume(store_id: string, last: number) {
    const response = await apiClient.get(
      `${prefix}/${store_id}/sales/resume?last=${last}`
    );
    return response.data;
  },

  async deleteForbiddenItems(store_id: string) {
    const response = await apiClient.post(
      `${prefix}/${store_id}/items/delete/forbidden`
    );
    return response.data;
  },

  async startPublication(store_id: string, query: any = {}) {
    const response = await apiClient.post(
      `${prefix}/${store_id}/publications`,
      { query }
    );
    return response.data;
  },

  async searchItems(store_id: string, filter: any, params: any) {
    const response = await apiClient.post(
      `${prefix}/${store_id}/items/search`,
      filter,
      { params }
    );
    return response.data;
  },
};

export default store;
