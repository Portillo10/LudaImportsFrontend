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
};

export default scrape;
