import apiClient from "./apiClient";
const baseUrl = "/processes";

export default {
  async getProgress(processName: string, store_id: string) {
    const response = await apiClient.get(`${baseUrl}/${processName}`, {
      params: { store_id },
    });
    const { data, status } = response;
    return { data, status };
  },

  async getChildrenProcess(processName: string) {
    const response = await apiClient.get(`${baseUrl}/${processName}/children`);
    const { data, status } = response;
    return { data, status };
  },

  async getRunningProcess(store_id: string, processes?: string[]) {
    const response = await apiClient.get(`${baseUrl}/running`, {
      params: { store_id, processes },
    });
    const { data, status } = response;
    return { data, status };
  },
};
