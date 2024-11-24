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

  return { scrapeBySku };
};
