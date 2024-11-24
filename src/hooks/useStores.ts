import { isAxiosError } from "axios";
import storeService from "../services/storeService";
import { useUserStore } from "../store/UserStore";
import { useState } from "react";
import { IStore } from "../types/store";
import { useShopStore } from "../store/ShopStore";

export const useStores = () => {
  const { user, pushStore } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const { setStores, stores, toggleAllowUpdate } = useShopStore();
  // const [stores, setStores] = useState<IStore[]>([]);
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

  // const toggleAllowUpdate = async (store: IStore) => {
  //   try {
  //     console.log(stores);
  //     const currentStores = stores.filter((val) => val._id != store._id);
  //     store.allowUpdate = !store.allowUpdate;
  //     currentStores.push(store);

  //     setStores(currentStores);
  //   } catch (error) {
  //     if (error instanceof Error) setError(error.message);
  //   }
  // };

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
      const data = await storeService.getStores();

      setStores(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return {
    handleSuccessLinkStore,
    toggleAllowUpdate,
    handleLinkStore,
    endLinkStore,
    getAllStores,
    loading,
    stores,
    error,
  };
};
