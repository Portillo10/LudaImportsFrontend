import { useEffect, useState } from "react";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import { UpdatingProgressResponse } from "../../types/apiResponses";
import { usePriceUpdating } from "../../hooks/usePriceUpdating";
import Spinner from "../../components/Spinner/Spinner";

type UpdateProgressPanelProps = {
  updatingProgress: UpdatingProgressResponse | null;
  refreshUpdatingProgress: () => Promise<void>;
};

const UpdateProgressPanel: React.FC<UpdateProgressPanelProps> = ({
  updatingProgress,
  refreshUpdatingProgress,
}) => {
  const [loadingPatch, setLoadingPatch] = useState<boolean>(false);
  const { patchUpdatingProcess } = usePriceUpdating();

  useEffect(() => {
    refreshUpdatingProgress();

    const intervalId = setInterval(() => {
      refreshUpdatingProgress();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const onPatchProgress = async (status: string) => {
    if (!loadingPatch) {
      setLoadingPatch(true);
      await patchUpdatingProcess(status);
      await refreshUpdatingProgress();
      setLoadingPatch(false);
    }
  };

  if (updatingProgress) {
    return (
      <div className="w-full flex flex-col gap-6 items-center px-2 fade-in">
        <ul className="p-3 bg-[#3b3f4e] flex justify-around items-center gap-6 rounded-md shadow-md shadow-slate-900">
          <li>
            <p className="text-[12px] text-gray-300">Precios actualizados</p>
            <span className="text-2xl">
              {updatingProgress.trackingProgress.itemsCount
                ? updatingProgress.trackingProgress.itemsCount.toLocaleString(
                    "es-US"
                  )
                : 0}
            </span>
          </li>
          <li>
            <p className="text-[12px] text-gray-300">Créditos gastados</p>
            <span className="text-2xl">
              {updatingProgress.trackingProgress.usedCredits
                ? updatingProgress.trackingProgress.usedCredits.toLocaleString(
                    "es-US"
                  )
                : 0}
            </span>
          </li>
          <li>
            <p className="text-[12px] text-gray-300">Productos omitidos</p>
            <span className="text-2xl">
              {updatingProgress.singleProgress.errors
                ? updatingProgress.singleProgress.errors.length.toLocaleString(
                    "es-US"
                  )
                : 0}
            </span>
          </li>
        </ul>
        <LoadingBar
          progress={updatingProgress.trackingProgress.processedCount}
          total={updatingProgress.trackingProgress.total}
          label="Analizando por link..."
        />
        {updatingProgress.singleProgress.status == "running" ||
        updatingProgress.singleProgress.status == "paused" ? (
          <LoadingBar
            progress={updatingProgress.singleProgress.processedCount}
            total={updatingProgress.singleProgress.total}
            label="Analizando por producto..."
          />
        ) : (
          <></>
        )}
        {loadingPatch ? (
          <Spinner size={30} />
        ) : (
          <div className="flex items-center gap-6">
            {updatingProgress.singleProgress.status == "running" ? (
              <button
                className="base-button hover:bg-[#423d3d] bg-[#555252] w-20"
                onClick={() => onPatchProgress("paused")}
              >
                Pausar
              </button>
            ) : (
              <button
                className="base-button hover:bg-[#237226] bg-[#338836] w-28"
                onClick={() => onPatchProgress("running")}
              >
                Reanudar
              </button>
            )}
            <button
              onClick={() => onPatchProgress("stopped")}
              className="base-button hover:bg-[#B71C1C] bg-[#D32F2F]"
            >
              Detener
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default UpdateProgressPanel;
