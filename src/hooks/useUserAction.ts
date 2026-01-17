import { useState } from "react";
import userActionService from "../services/userActionService";

export const useUserAction = () => {
  const [queue, setQueue] = useState<any[]>([]);
  const [completedActionsCount, setCompletedActionsCount] = useState<number>(0);
  const [pendingActionsCount, setPendingActionsCount] = useState<number>(0);

  const loadQueue = async (action_id: string) => {
    try {
      const response = await userActionService.getUserActionQueue(action_id);
      setCompletedActionsCount(response.completed || 0);
      setPendingActionsCount(response.pending || 0);
      setQueue(response.queue);
    } catch (error) {
      console.log(error);
    }
  };

  const getStoreAction = async (store_id: string) => {
    try {
      const { action } = await userActionService.getUserActions(store_id);
      return action;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return {
    queue,
    pendingActionsCount,
    completedActionsCount,
    loadQueue,
    getStoreAction,
  };
};
