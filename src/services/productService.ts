import { IProduct } from "../types/product";
import { convertToQueryParams } from "../utils/helpers";
import apiClient from "./apiClient";

const productService = {
  async update(data: Partial<IProduct>, sku: string) {
    const response = await apiClient.put(`/products?sku=${sku}`, data);
    return response.data;
  },

  async getItems(filter: any) {
    const queryParams = convertToQueryParams(filter);
    const response = await apiClient.get("/products/items?" + queryParams);
    return response.data;
  },
};

export default productService;
