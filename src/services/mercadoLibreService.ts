import { CalcPriceResponse } from "../types/apiResponses";
import apiClient from "./apiClient";

const mercadoLibreService = {
  calcPrice: async (storeId: string, sku: string) => {
    const response = await apiClient.get(
      `/api/store/${storeId}/calc-price?sku=${sku}`
    );
    const responseData: CalcPriceResponse = response.data;
    return responseData;
  },
};

export default mercadoLibreService;
