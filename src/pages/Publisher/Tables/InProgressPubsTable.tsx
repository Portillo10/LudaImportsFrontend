import { useEffect, useState } from "react";
import PubsTable from "./PubsTable";
import Spinner from "../../../components/Spinner/Spinner";
import { useStores } from "../../../hooks/useStores";

const inProgressPubsColumns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 w-36",
    rowClass: "",
  },
  {
    key: "processedCount",
    label: "Publicados",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "text-green-300",
  },
  {
    key: "errorCount",
    label: "Omitidos",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "text-red-300",
  },
  { key: "actions", class: "px-3 flex items-center", label: "", rowClass: "" },
];

const InProgressTable: React.FC<{
  inProgressPubs: any[];
  loading: boolean;
  updatePubs: () => Promise<void>;
}> = ({ inProgressPubs, loading, updatePubs }) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [patchLabel, setPatchLabel] = useState<string>("Pausar");
  const [patchStatus, setPatchStatus] = useState<string>("paused");
  const { patchPublications } = useStores();
  const inProgressOptions = [
    {
      label: patchLabel,
      click: async (store_id: string) => {
        await patchPublications(store_id, patchStatus);
      },
    },
  ];

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
      const storeProgress = inProgressPubs[index];
      if (storeProgress.status == "running") {
        setPatchLabel("Pausar");
        setPatchStatus("paused");
      } else if (
        storeProgress.status == "paused" ||
        storeProgress.status == "stopped"
      ) {
        setPatchStatus("running");
        setPatchLabel("Reanudar");
      }
    }
  };

  useEffect(() => {
    const handleClickWindow = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement && ev.target.tagName !== "SPAN")
        setActiveMenuIndex(-1);
    };
    document.addEventListener("click", handleClickWindow);

    const intervalId = setInterval(() => {
      updatePubs();
    }, 5000);

    return () => {
      document.removeEventListener("click", handleClickWindow);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-8 gap-4 rounded-lg border border-gray-900 shadow-sm shadow-black">
      {loading ? (
        <>
          <div className="w-full text-left py-4">
            <h2 className="text-lg">Publicaciones en progreso</h2>
          </div>
          <Spinner />
        </>
      ) : inProgressPubs?.length == 0 ? (
        <></>
      ) : (
        <>
          <div className="w-full text-left py-4">
            <h2 className="text-lg">Publicaciones en progreso</h2>
          </div>
          <PubsTable
            pubs={inProgressPubs}
            handleClickMenu={onClickMenu}
            columns={inProgressPubsColumns}
            menuOptions={inProgressOptions}
            activeMenuIndex={activeMenuIndex}
          />
        </>
      )}
    </div>
  );
};

export default InProgressTable;
