import apiClient from "./apiClient";

const PREFIX = "/user-actions";

const userActionService = {
  async getUserActions(store__id: string) {
    const response = await apiClient.get(`${PREFIX}/${store__id}`);
    return response.data;
  },

  async getUserActionQueue(action_id: string) {
    const response = await apiClient.get(`${PREFIX}/queue/${action_id}`);
    return response.data;
  },

  async postUserAction(data: any) {
    const response = await apiClient.post(`${PREFIX}`, data);
    return response.data;
  },
};

export default userActionService;
