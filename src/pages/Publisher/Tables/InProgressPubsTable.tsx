import { useEffect, useState } from "react";
import PubsTable from "./PubsTable";
import Spinner from "../../../components/Spinner/Spinner";

const inProgressPubsColumns = [
  {
    key: "alias",
    label: "Tienda",
    class: "px-6 w-36",
    rowClass: "",
  },
  {
    key: "postedCount",
    label: "Publicados hoy",
    class: "px-6 w-44 text-right leading-tight",
    rowClass: "text-green-300",
  },
  {
    key: "errorCount",
    label: "Productos omitidos",
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

  const inProgressOptions = [
    { label: "Detener publicación", click: async () => {} },
  ];

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
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
    <>
      {loading ? (
        <>
          <div className="w-full text-left py-4">
            <h2 className="text-lg">Publicaciones en progreso</h2>
          </div>
          <Spinner />
        </>
      ) : inProgressPubs.length == 0 ? (
        <></>
      ) : (
        <>
          <div className="w-full text-left py-4">
            <h2 className="text-lg">Publicaciones en progreso</h2>
          </div>
          <PubsTable
            pubs={inProgressPubs}
            menuOptions={inProgressOptions}
            activeMenuIndex={activeMenuIndex}
            columns={inProgressPubsColumns}
            handleClickMenu={onClickMenu}
          />
        </>
      )}
    </>
  );
};

export default InProgressTable;
