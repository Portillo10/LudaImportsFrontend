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
};

export default store;
