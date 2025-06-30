import { useEffect, useState } from "react";
import { useMLApi } from "../../../hooks/useMLApi";
import { useStores } from "../../../hooks/useStores";
import PubsTable from "./PubsTable";
import Spinner from "../../../components/Spinner/Spinner";
import Toast from "../../../components/Toast/Toast";

const pendingPubsColumns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 max-w-60 w-full",
    rowClass: "",
  },
  {
    key: "pausedCount",
    label: "Pausadas",
    class: "px-6 max-w-60 w-full text-right leading-tight",
    rowClass: "",
  },
  {
    key: "activeCount",
    label: "Activas",
    class: "px-6 max-w-60 w-full text-right leading-tight",
    rowClass: "text-green-300",
  },
  {
    key: "pendingCount",
    label: "Pendientes",
    class: "px-6 max-w-60 w-full text-right leading-tight",
    rowClass: "text-red-300",
  },
  {
    key: "total",
    label: "Total",
    class: "px-6 max-w-60 w-full text-right leading-tight",
    rowClass: "text-red-300",
  },
  { key: "actions", class: "px-3 flex items-center", label: "", rowClass: "" },
];

const PendingTable: React.FC<{ onPublish: () => Promise<void> }> = ({
  onPublish,
}) => {
  const { postProducts } = useMLApi();
  const { getPendingPublications } = useStores();

  const [pendingPublications, setPendingPublications] = useState<any[]>([]);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const clickPostPending = async (store_id: string) => {
    if (await postProducts(store_id)) {
      setToastType("success");
      setToastMessage("Publicación iniciada.");
      onPublish();
    } else {
      setToastType("error");
      setToastMessage("Ocurrió un error iniciando la publicación");
    }
    setActiveToast(true);
    setActiveMenuIndex(-1);
  };

  const pendingOptions = [
    { label: "Iniciar publicación", click: clickPostPending },
    { label: "Eliminar pendientes", click: async () => {} },
  ];

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
    }
  };

  const updatePubs = async () => {
    setLoading(true);
    const response = await getPendingPublications();
    if (response) setPendingPublications(response);
    setLoading(false);
  };

  useEffect(() => {
    updatePubs();
    const handleClickWindow = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement && ev.target.tagName !== "SPAN")
        setActiveMenuIndex(-1);
    };
    document.addEventListener("click", handleClickWindow);

    return () => {
      document.removeEventListener("click", handleClickWindow);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-8 gap-4 rounded-lg border border-gray-900 shadow-sm shadow-black">
      <div className="w-full text-left">
        <h2 className="text-lg">Publicaciones pendientes</h2>
      </div>
      {loading ? (
        <Spinner />
      ) : pendingPublications.length == 0 ? (
        <p className="w-full text-center">No hay publicaciones pendientes</p>
      ) : (
        <PubsTable
          columns={pendingPubsColumns}
          activeMenuIndex={activeMenuIndex}
          handleClickMenu={onClickMenu}
          menuOptions={pendingOptions}
          pubs={pendingPublications}
        />
      )}
      {activeToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setActiveToast(false)}
        />
      )}
    </div>
  );
};

export default PendingTable;
