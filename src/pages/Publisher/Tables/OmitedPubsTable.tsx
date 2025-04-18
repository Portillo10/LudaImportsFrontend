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
    class: "px-6 w-36",
    rowClass: "",
  },
  {
    key: "omitedCount",
    label: "Productos omitidos",
    class: "px-6 w-44 text-right leading-tight",
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
    <>
      {loading ? (
        <>
          <div className="w-full text-left py-4">
            <h2 className="text-lg">Productos omitidos</h2>
          </div>
          <Spinner />
        </>
      ) : pendingPublications.length == 0 ? (
        <></>
      ) : (
        <>
          <div className="w-full text-left py-4">
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
    </>
  );
};

export default OmitedPubsTable;
