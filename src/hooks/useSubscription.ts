import { useState } from "react";
import subscriptionService from "../services/subscriptionService";
import { isAxiosError } from "axios";

export const useSubscription = () => {
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const closeToast = () => {
    setActiveToast(false);
  };

  const cancelSubscription = async (store_id: string) => {
    try {
      const response = await subscriptionService.cancelSubscription(store_id);
      setToastMsg("Membresía cancelada");
      setToastType("success");
      setActiveToast(true);
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const startSubscription = async (store_id: string) => {
    try {
      const response = await subscriptionService.startSubscription(store_id);
      if (response.status == 201) {
        setToastMsg("Membresía iniciada");
        setToastType("success");
        setActiveToast(true);
      }
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const setError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data) {
      const {
        response: { data },
      } = error;
      setToastMsg(data.message);
    } else if (error instanceof Error) {
      setToastMsg(error.message);
    }
    setToastType("error");
    setActiveToast(true);
  };

  const renewSubscription = async (store_id: string) => {
    try {
      const response = await subscriptionService.renewSubscription(store_id);
      setToastMsg("Membresía renovada");
      setToastType("success");
      setActiveToast(true);
      return response.data;
    } catch (error) {
      setError(error);
    }
  };

  const getSubscription = async (store_id: string) => {
    try {
      const response = await subscriptionService.getSubscription(store_id);
      return response.data.subscription;
    } catch (error) {
      setError(error);
    }
  };

  return {
    cancelSubscription,
    startSubscription,
    renewSubscription,
    getSubscription,
    closeToast,
    activeToast,
    toastType,
    toastMsg,
  };
};
