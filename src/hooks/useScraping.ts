import { isAxiosError } from "axios";
import scrapeService from "../services/scrapeService";

export const useScraping = () => {
  const scrapeBySku = async (sku: string) => {
    try {
      const response = await scrapeService.scrapeBySku(sku);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initializeScraping = async (data: any) => {
    try {
      const response = await scrapeService.initializeScraping(data);
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  };

  const getScrapingProgress = async () => {
    try {
      const response = await scrapeService.getScrapingProgress();
      console.log(response);
    } catch (error) {}
  };

  return { scrapeBySku, initializeScraping, getScrapingProgress };
};
