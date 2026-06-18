import { isAxiosError } from "axios";
import scrapeService from "../services/scrapeService";
import { Item } from "../types/item";
import { useState } from "react";
import { Progress } from "../types/apiResponses";
import processesService from "../services/processesService";
import { ScrapingProgress } from "../types/scrapingProgress";
// import { useUserStore } from "../store/UserStore";

export const useScraping = () => {
  // const { user } = useUserStore();
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(
    "success",
  );
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [extractTasksProgress, setExtractTasksProgress] = useState<Progress>();
  const [extractProductsProgress, setExtractProductsProgress] =
    useState<Progress>();

  const [scrapingProgress, setScrapingProgress] = useState<ScrapingProgress>();

  const setError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data) {
      const {
        response: { data },
      } = error;
      if (data.message) setToastMsg(data.message);
      else setToastMsg("Error desconocido");
    } else if (error instanceof Error) {
      setToastMsg(error.message);
    }
    setToastType("error");
    setActiveToast(true);
  };

  const closeToast = () => {
    setActiveToast(false);
    setToastMsg("");
    setToastType(null);
  };

  const scrapeBySku = async (
    sku: string,
    store_id: string,
    category_id: string,
    defaultWeight?: number,
    defaultDimensions?: string,
  ) => {
    try {
      const response: { item: Item; pricing: any } =
        await scrapeService.scrapeBySku(
          sku,
          store_id,
          category_id,
          defaultWeight,
          defaultDimensions,
        );
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const startScraping = async (store_id: string) => {
    try {
      const response = await scrapeService.startScraping(store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const fetchScrapingProgress = async (store_id?: string) => {
    try {
      const { data: taskExtractProgress } = await processesService.getProgress(
        "task-extract",
        store_id,
      );

      const { data: productExtractProgress } =
        await processesService.getProgress("product-extract", store_id);

      setExtractProductsProgress(productExtractProgress);
      setExtractTasksProgress(taskExtractProgress);
      setScrapingProgress({
        itemsCount: 0,
        total: extractProductsProgress?.total || 0,
        errors: extractProductsProgress?.errors || [],
        errorCount: extractProductsProgress?.errorCount || 0,
        status: extractProductsProgress?.status || "stopped",
        usedCredits:
          (extractProductsProgress?.usedCredits || 0) +
          (extractTasksProgress?.usedCredits || 0),
        processedCount: extractProductsProgress?.processedCount || 0,
      });
    } catch (error) {
      setError(error);
    }
  };

  const getScrapingProgress = async (store_id?: string) => {
    try {
      const response = await scrapeService.getScrapingProgress(store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const resumeScraping = async () => {
    try {
      const response = await scrapeService.resumeScraping();
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const pauseScraping = async () => {
    try {
      await scrapeService.pauseTasks();
    } catch (error) {
      setError(error);
    }
  };

  const loadAmazonUrls = async (data: any, store_id: string) => {
    try {
      const response = await scrapeService.loadAmazonUrls(data, store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const hasPendingTasks = async (store_id: string) => {
    try {
      const response = await scrapeService.hasPendingTasks(store_id);
      return response.hasPending;
    } catch (error) {
      setError(error);
    }
  };

  return {
    scrapingProgress,
    activeToast,
    toastType,
    toastMsg,
    closeToast,
    scrapeBySku,
    startScraping,
    pauseScraping,
    resumeScraping,
    hasPendingTasks,
    loadAmazonUrls,
    getScrapingProgress,
    fetchScrapingProgress,
  };
};
