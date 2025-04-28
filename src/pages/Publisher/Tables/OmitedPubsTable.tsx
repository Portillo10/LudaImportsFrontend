import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import Toast from "../../../components/Toast/Toast";
import PubsTable from "./PubsTable";
import { useStores } from "../../../hooks/useStores";
import { useMLApi } from "../../../hooks/useMLApi";

const omitedPubsColumns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 max-w-60 w-full",
    rowClass: "",
  },
  {
    key: "omitedCount",
    label: "Productos omitidos",
    class: "px-6 max-w-60 w-full text-right leading-tight",
    rowClass: "",
  },
  {
    key: "actions",
    label: "",
    class: "px-3 flex items-center",
    rowClass: "",
  },
];

const OmitedPubsTable: React.FC = () => {
  const { getOmitedPubs } = useStores();
  const { postProducts } = useMLApi();

  const [pendingPublications, setPendingPublications] = useState<any[]>([]);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
    }
  };

  const updatePubs = async () => {
    setLoading(true);
    const response = await getOmitedPubs();
    if (response) setPendingPublications(response);
    setLoading(false);
  };

  const clickPostOmited = async (store_id: string) => {
    if (await postProducts(store_id, "omited")) {
      setToastMessage("Publicación iniciada");
      setToastType("success");
    } else {
      setToastMessage("Ocurrió un error, vuelve a intentarlo");
      setToastType("error");
    }
  };

  const omitedOptions = [
    { label: "Publicar", click: clickPostOmited },
    { label: "Inspeccionar", click: async () => {} },
    { label: "Eliminar", click: async () => {} },
  ];

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
      {loading ? (
        <>
          <div className="w-full text-left">
            <h2 className="text-lg">Productos omitidos</h2>
          </div>
          <Spinner />
        </>
      ) : pendingPublications.length == 0 ? (
        <></>
      ) : (
        <>
          <div className="w-full text-left">
            <h2 className="text-lg">Productos omitidos</h2>
          </div>
          <PubsTable
            columns={omitedPubsColumns}
            activeMenuIndex={activeMenuIndex}
            handleClickMenu={onClickMenu}
            menuOptions={omitedOptions}
            pubs={pendingPublications}
          />
        </>
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

export default OmitedPubsTable;
