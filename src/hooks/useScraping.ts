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

  const runTasks = async (store_id: string) => {
    try {
      const response = await scrapeService.runTasks(store_id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const getScrapingProgress = async () => {
    try {
      const response = await scrapeService.getScrapingProgress();
      console.log(response);
    } catch (error) {}
  };

  const pauseScraping = async () => {
    try {
      await scrapeService.pauseTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    scrapeBySku,
    pauseScraping,
    initializeScraping,
    getScrapingProgress,
    runTasks,
  };
};
