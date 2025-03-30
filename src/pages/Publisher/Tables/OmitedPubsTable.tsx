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
    key: "errorCount",
    label: "Publicaciones activas",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "",
  },
];

const OmitedPubsTable: React.FC = () => {
  const { getOmitedPubs } = useStores();
  const { postOmited } = useMLApi();

  const [pendingPublications, setPendingPublications] = useState<any[]>([]);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    if (await postOmited(store_id)) {
      setToastMessage("Publicación iniciada");
      setToastType("success");
    } else {
      setToastMessage("Ocurrió un error, vuelve a intentarlo");
      setToastType("error");
    }
  };

  const omitedOptions = [
    { label: "Publicar productos omitidos", click: clickPostOmited },
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
      <div className="w-full text-left py-4">
        <h2 className="text-lg">Publicaciones pendientes</h2>
      </div>
      {loading ? (
        <Spinner />
      ) : pendingPublications.length == 0 ? (
        <p className="w-full text-center">No hay publicaciones pendientes</p>
      ) : (
        <PubsTable
          columns={omitedPubsColumns}
          activeMenuIndex={activeMenuIndex}
          handleClickMenu={onClickMenu}
          menuOptions={omitedOptions}
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
    </>
  );
};

export default OmitedPubsTable;
