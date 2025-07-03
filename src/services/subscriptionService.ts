import apiClient from "./apiClient";

const prefix = "/subscriptions";

export default {
  async renewSubscription(store_id: string) {
    const response = await apiClient.post(`${prefix}/store/${store_id}/renew`);
    const { data, status } = response;
    return { status, data };
  },

  async startSubscription(store_id: string) {
    const response = await apiClient.post(`${prefix}/store/${store_id}`);
    const { data, status } = response;
    return { data, status };
  },

  async cancelSubscription(store_id: string) {
    const response = await apiClient.put(`${prefix}/store/${store_id}/cancel`);
    const { data, status } = response;
    return { data, status };
  },

  async getSubscription(store_id: string) {
    const response = await apiClient.get(`${prefix}/store/${store_id}`);
    const { data, status } = response;
    return { data, status };
  },
};
