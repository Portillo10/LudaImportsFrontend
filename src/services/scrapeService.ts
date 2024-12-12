import apiClient from "./apiClient";

const scrape = {
  scrapeBySku: async (sku: string) => {
    const response = await apiClient.post(
      "/scrape",
      { sku },
      { timeout: 200000 }
    );

    return response.data;
  },
  async initializeScraping(data: any) {
    const response = await apiClient.post("/scrape/initialize", data);
    return response.data;
  },

  async getScrapingProgress() {
    const response = await apiClient.get("/scrape/tasks");
    return response.data;
  },

  async runTasks(store_id: string) {
    const response = await apiClient.put("/scrape/tasks/run", { store_id });
    return response.data;
  },
};

export default scrape;
