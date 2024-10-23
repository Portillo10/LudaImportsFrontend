import { isAxiosError } from "axios";
import storeService from "../services/storeService";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { IStore } from "../types/store";

export const useLinkStore = () => {
  const { user, pushStore } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

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
        setError(error.response?.data);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const endLinkStore = (store: IStore) => {
    pushStore(store);
    setLoading(false);
  };

  return { handleLinkStore, endLinkStore, error, loading };
};
