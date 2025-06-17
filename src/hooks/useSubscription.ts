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

  const startSubscription = async (store_id: string) => {
    try {
      const response = await subscriptionService.startSubscription(store_id);
      if (response.status == 201) {
        setToastMsg("Subscripción iniciada");
        setToastType("success");
        setActiveToast(true);
      }
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.data.error) {
        const {
          response: { data },
        } = error;
        setToastMsg(data.error);
      } else if (error instanceof Error) {
        setToastMsg(error.message);
      }
      setToastType("error");
      setActiveToast(true);
    }
  };

  return {
    startSubscription,
    closeToast,
    activeToast,
    toastType,
    toastMsg,
  };
};
