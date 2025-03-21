import { useEffect } from "react";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import { UpdatingProgressResponse } from "../../types/apiResponses";

type UpdateProgressPanelProps = {
  updatingProgress: UpdatingProgressResponse | null;
  refreshUpdatingProgress: () => void;
};

const UpdateProgressPanel: React.FC<UpdateProgressPanelProps> = ({
  updatingProgress,
  refreshUpdatingProgress,
}) => {
  useEffect(() => {
    refreshUpdatingProgress();

    const intervalId = setInterval(() => {
      refreshUpdatingProgress();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (updatingProgress) {
    return (
      <div className="w-full flex flex-col gap-6 items-center px-2">
        <ul className="p-3 bg-[#3b3f4e] flex justify-around items-center gap-6 rounded-md shadow-md shadow-slate-900">
          <li>
            <p className="text-[12px] text-gray-300">Precios actualizados</p>
            <span className="text-2xl">
              {updatingProgress.trackingProgress.updatedCount.toLocaleString(
                "es-US"
              )}
            </span>
          </li>
          <li>
            <p className="text-[12px] text-gray-300">Productos omitidos</p>
            <span className="text-2xl">
              {updatingProgress.singleProgress.errors.length.toLocaleString(
                "es-US"
              )}
            </span>
          </li>
          <li>
            <p className="text-[12px] text-gray-300">Créditos gastados</p>
            <span className="text-2xl">
              {updatingProgress.trackingProgress.usedCredits.toLocaleString(
                "es-US"
              )}
            </span>
          </li>
        </ul>
        <LoadingBar
          progress={updatingProgress.trackingProgress.updatedTasksCount}
          total={updatingProgress.trackingProgress.tasksToUpdate}
          label="Analizando por link..."
        />
        {updatingProgress.singleProgress.status == "running" ? (
          <LoadingBar
            progress={updatingProgress.singleProgress.updatedCount}
            total={updatingProgress.singleProgress.total}
            label="Analizando por producto..."
          />
        ) : (
          <></>
        )}
        <button className="px-4 py-2 font-semibold text-base rounded-md hover:bg-[#B71C1C] transition flex justify-center bg-[#D32F2F]">
          Cancelar
        </button>
      </div>
    );
  }
};

export default UpdateProgressPanel;
