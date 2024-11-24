import { useState } from "react";
import mercadoLibreService from "../services/mercadoLibreService";
import { useAuth } from "./useAuth";

export const useMLApi = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const predictCategory = async (sku: string) => {
    setLoading(true);
    try {
      if (user) {
        const response = await mercadoLibreService.predictCategory(
          sku,
          user.stores[0]._id
        );
        console.log(response);
        return response;
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { predictCategory, error, loading };
};
