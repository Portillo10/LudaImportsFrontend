import { isAxiosError } from "axios";
import storeService from "../services/storeService";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { IStore } from "../types/store";
import { useShopStore } from "../store/ShopStore";
import { getStoresLength, setStoresLength } from "../utils/cacheHelper";

export const useStores = () => {
  const { user, pushStore } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const { setStores, stores, toggleAllowUpdate } = useShopStore();

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

  const getAllStores = async () => {
    try {
      if (stores.length == 0) {
        setLoading(true);
        const data = await storeService.getStores();
        setStoresLength(data.length);
        setStores(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletons = () => {
    const lengthString = getStoresLength();
    let items = [0, 1, 2, 3];
    if (lengthString) {
      items = [];
      const length = parseInt(lengthString);
      for (let i = 0; i < length; i++) {
        items.push(i);
      }
    }
    return items;
  };

  const getStoresByUser = async (
    user_id: string
  ): Promise<IStore[] | undefined> => {
    try {
      const stores = await storeService.getStoresByUser(user_id);
      return stores;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const sincronizeStore = async (store_id: string) => {
    try {
      const response = await storeService.sincronizeStore(store_id);
      return response;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const deleteAllProducts = async (store_id: string) => {
    try {
      const response = await storeService.deleteAllItems(store_id);
      return response;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const transferProducts = async (
    target_store_id: string,
    origin_store_id: string
  ) => {
    try {
      const response = await storeService.transferProducts(
        origin_store_id,
        target_store_id
      );

      return response;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const getPendingPublications = async () => {
    try {
      return await storeService.getPendingPublications();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  const getPostingProgress = async () => {
    try {
      return await storeService.getPostingProgress();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const getOmitedPubs = async () => {
    try {
      return await storeService.getOmitedPubs();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const savePricing = async (data: any) => {
    try {
      return await storeService.savePricing(data);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const getPricing = async (user_id: string) => {
    try {
      return await storeService.getPricing(user_id);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return {
    handleSuccessLinkStore,
    getPendingPublications,
    getPostingProgress,
    toggleAllowUpdate,
    deleteAllProducts,
    transferProducts,
    sincronizeStore,
    getStoresByUser,
    handleLinkStore,
    renderSkeletons,
    getOmitedPubs,
    endLinkStore,
    getAllStores,
    savePricing,
    getPricing,
    loading,
    stores,
    error,
  };
};
