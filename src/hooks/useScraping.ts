import { isAxiosError } from "axios";
import scrapeService from "../services/scrapeService";
import { IProduct } from "../types/product";

export const useScraping = () => {
  const scrapeBySku = async (
    sku: string,
    store_id: string,
    category_id: string
  ) => {
    try {
      const response: IProduct = await scrapeService.scrapeBySku(
        sku,
        store_id,
        category_id
      );
      return response;
    } catch (error) {
      if (isAxiosError(error)) console.log(error.response?.data);
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

  const getScrapingProgress = async (store_id?: string) => {
    try {
      const response = await scrapeService.getScrapingProgress(store_id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
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
