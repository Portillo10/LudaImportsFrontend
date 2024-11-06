import { isAxiosError } from "axios";
import storeService from "../services/storeService";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { IStore } from "../types/store";

export const useLinkStore = () => {
  const { user, pushStore } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  // const navigate = useNavigate();

  const handleLinkStore = async (data: any) => {
    try {
      setLoading(true);

      if (user) {
        const requestBody = {
          ...data,
          seller_id: user._id,
        };
        const response = await storeService.linkStore(requestBody);
        localStorage.setItem("linkData", JSON.stringify(requestBody));
        window.open(response.redirectUrl, "_blank");
      } else {
        console.error("No hay una sesión iniciada");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);

        setError(error.response?.data);
      } else if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleSuccessLinkStore = async (code: string) => {
    try {
      const dataString = localStorage.getItem("linkData");
      if (dataString) {
        const data = JSON.parse(dataString);
        const response = await storeService.linkStoreSuccess(code, data);
        return response;
      } else {
        throw new Error(
          "Los datos de vinculación no se cargaron correctamente"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const endLinkStore = (store: IStore) => {
    pushStore(store);
    setLoading(false);
  };

  return {
    handleSuccessLinkStore,
    handleLinkStore,
    endLinkStore,
    loading,
    error,
  };
};
