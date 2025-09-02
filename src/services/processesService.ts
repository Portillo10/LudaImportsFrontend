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

  async getGlobalProcess(processName: string) {
    const response = await apiClient.get(`${baseUrl}/${processName}/global`);
    const { data, status } = response;
    return { data, status };
  },
};
