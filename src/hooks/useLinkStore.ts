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
        const response = await storeService.linkStore({
          ...data,
          seller_id: user._id,
        });

        window.open(response.data.redirectUrl, "_blank");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);

        setError(error.response?.data);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleSuccessLinkStore = async (code: string) => {
    try {
      const response = await storeService.linkStoreSuccess(code);
      return response;
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
