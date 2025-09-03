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
  const { setStores, stores, toggleAllowUpdate } = useShopStore();

  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(
    "success"
  );
  const [activeToast, setActiveToast] = useState<boolean>(false);

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

  const startPublication = async (store_id: string, query: any = {}) => {
    try {
      const response = await storeService.startPublication(store_id, query);
      setToastMsg("Proceso iniciado");
      setToastType("success");
      setActiveToast(true);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const handleLinkStore = async (data: any, user_id?: string) => {
    try {
      setLoading(true);

      let seller_id = user_id || user?._id;
      if (seller_id) {
        const requestBody = {
          ...data,
          seller_id,
        };
        const response = await storeService.linkStore(requestBody);
        localStorage.setItem("linkData", JSON.stringify(requestBody));
        window.open(response.redirectUrl, "_blank");
      } else {
        console.error("Se requiere el id del usuario");
      }
    } catch (error) {
      setError(error);
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
      setError(error);
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
        const data = (await storeService.getStores()).filter(
          (store: any) => !store.suspended
        );
        setStoresLength(data.length);
        setStores(data);
      }
    } catch (error) {
      setError(error);
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
  ): Promise<{ stores: IStore[]; user: any } | undefined> => {
    try {
      const response = await storeService.getStoresByUser(user_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const sincronizeStore = async (store_id: string) => {
    try {
      const response = await storeService.sincronizeStore(store_id);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const deleteAllProducts = async (store_id: string) => {
    try {
      const response = await storeService.deleteAllItems(store_id);
      return response;
    } catch (error) {
      setError(error);
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
      setError(error);
    }
  };

  const getPendingPublications = async () => {
    try {
      return await storeService.getPendingPublications();
    } catch (error) {
      setError(error);
    }
  };

  const getPostingProgress = async () => {
    try {
      return await storeService.getPostingProgress();
    } catch (error) {
      setError(error);
    }
  };

  const getOmitedPubs = async () => {
    try {
      return await storeService.getOmitedPubs();
    } catch (error) {
      setError(error);
    }
  };

  const savePricing = async (data: any) => {
    try {
      return await storeService.savePricing(data);
    } catch (error) {
      setError(error);
    }
  };

  const getPricing = async (user_id: string) => {
    try {
      return await storeService.getPricing(user_id);
    } catch (error) {
      setError(error);
    }
  };

  const patchPublications = async (store_id: string, status: string) => {
    try {
      const response = await storeService.patchPublications(store_id, status);
      setToastMsg("Proceso iniciado");
      setToastType("success");
      setActiveToast(true);
      return response;
    } catch (error) {
      setError(Error);
    }
  };

  const deleteItems = async (store_id: string, options: any) => {
    try {
      const response = await storeService.deleteItems(store_id, options);
      setToastType("success");
      setToastMsg("Proceso iniciado.");
      setActiveToast(true);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const patchItems = async (store_id: string, options: any, status: string) => {
    try {
      const response = await storeService.patchItems(store_id, options, status);
      setToastType("success");
      setToastMsg("Proceso iniciado.");
      setActiveToast(true);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  const searchItems = async (store_id: string, filters: any, params: any) => {
    try {
      const response = await storeService.searchItems(
        store_id,
        filters,
        params
      );

      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return {
    handleSuccessLinkStore,
    getPendingPublications,
    getPostingProgress,
    toggleAllowUpdate,
    patchPublications,
    deleteAllProducts,
    transferProducts,
    startPublication,
    sincronizeStore,
    getStoresByUser,
    handleLinkStore,
    renderSkeletons,
    getOmitedPubs,
    endLinkStore,
    deleteItems,
    getAllStores,
    savePricing,
    searchItems,
    getPricing,
    patchItems,
    closeToast,
    activeToast,
    toastType,
    toastMsg,
    loading,
    stores,
  };
};
