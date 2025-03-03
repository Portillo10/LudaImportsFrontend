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
    const response = await apiClient.get("/api/stores");
    return response.data;
  },

  async getStoresByUser(user_id: string) {
    const response = await apiClient.get(`/api/user/${user_id}/stores`);
    return response.data;
  },

  async sincronizeStore(store_id: string) {
    const response = await apiClient.put(`/api/store/${store_id}/sincronize`);
    return response.data;
  },

  async transferProducts(origin_store_id: string, target_store_id: string) {
    const response = await apiClient.post("/api/store/transfer-products", {
      origin_store_id,
      target_store_id,
    });
    return response.data;
  },

  async deleteAllItems(store_id: string) {
    const response = await apiClient.delete(
      `/api/store/${store_id}/items/all`,
      { timeout: 60000 }
    );
    return response.data;
  },

  async getPendingPublications() {
    return (await apiClient.get(`/stores/pending-products`, { timeout: 12000 }))
      .data;
  },
};

export default store;
