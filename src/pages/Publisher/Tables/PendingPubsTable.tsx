import { useEffect, useState } from "react";
import { useMLApi } from "../../../hooks/useMLApi";
import { useStores } from "../../../hooks/useStores";
import PubsTable from "./PubsTable";
import Spinner from "../../../components/Spinner/Spinner";

const pendingPubsColumns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 w-36",
    rowClass: "",
  },
  {
    key: "publishedCount",
    label: "Publicaciones",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "",
  },
  {
    key: "activeCount",
    label: "Publicaciones activas",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "text-green-300",
  },
  {
    key: "pendingCount",
    label: "Publicaciones pendientes",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "text-red-300",
  },
  { key: "actions", class: "px-3 flex items-center", label: "", rowClass: "" },
];

const PendingTable: React.FC = () => {
  const { postPendingProducts } = useMLApi();
  const { getPendingPublications } = useStores();
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingPublications, setPendingPublications] = useState<any[]>([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);

  const clickPostPending = async (store_id: string) => {
    await postPendingProducts(store_id);
    setActiveMenuIndex(-1);
  };

  const pendingOptions = [
    { label: "Iniciar publicación", click: clickPostPending },
    { label: "Eliminar pendientes", click: () => {} },
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
          columns={pendingPubsColumns}
          activeMenuIndex={activeMenuIndex}
          handleClickMenu={onClickMenu}
          menuOptions={pendingOptions}
          pubs={pendingPublications}
        />
      )}
    </>
  );
};

export default PendingTable;
