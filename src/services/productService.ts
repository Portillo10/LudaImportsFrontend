import { IProduct } from "../types/product";
import apiClient from "./apiClient";

const productService = {
  async update(data: Partial<IProduct>, sku: string) {
    const response = await apiClient.put(`/products?sku=${sku}`, data);
    return response.data;
  },
};

export default productService;
