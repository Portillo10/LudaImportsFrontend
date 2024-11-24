import apiClient from "./apiClient";

const testService = {
  async setSessionVar() {
    const response = await apiClient.post("/test/session-env");
    console.log(response);
  },
  async getSessionVar() {
    const response = await apiClient.get("/test/get-env");
    console.log(response);
  },
  async testJson() {
    await apiClient.post("/test/write-json");
  },
};

export default testService;
