import { useEffect, useState } from "react";
import { useStores } from "../../hooks/useStores";
import LargeTable from "../../components/LargeTable/LargeTable";
import LargeRow from "../../components/LargeTable/LargeRow";
import { useMLApi } from "../../hooks/useMLApi";

const Menu: React.FC<{
  postPending: (store_id: string) => void;
  store_id: string;
  classname?: string;
}> = ({ postPending, store_id, classname = "" }) => {
  return (
    <ul
      className={`${classname} z-50 absolute -right-36 w-44 bg-[#3a3b40] flex flex-col py-1 text-sm`}
    >
      <li
        onClick={() => postPending(store_id)}
        className="py-1 px-3 hover:bg-[#5d5f66] cursor-pointer"
      >
        Iniciar publicación
      </li>
      <li className="py-1 px-3 hover:bg-[#5d5f66] cursor-pointer">
        Eliminar pendientes
      </li>
    </ul>
  );
};

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
  { key: "actions", class: "pl-3 w-8 flex items-center", label: "" },
];

function PendingPosting() {
  const { postPendingProducts } = useMLApi();
  const { getPendingPublications } = useStores();
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [pendingPublications, setPendingPublications] = useState<any[]>([
    // {
    //   alias: "aalgo",
    //   pendingCount: 12,
    //   publishedCount: 10,
    // },
    // {
    //   alias: "aalgo",
    //   pendingCount: 12,
    //   publishedCount: 10,
    // },
    // {
    //   alias: "aalgo",
    //   pendingCount: 12,
    //   publishedCount: 10,
    // },
  ]);

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
    }
  };

  const clickPostPending = async (store_id: string) => {
    await postPendingProducts(store_id);
    setActiveMenuIndex(-1);
  };

  useEffect(() => {
    (async () => {
      const response = await getPendingPublications();

      if (response) setPendingPublications(response);

      const handleClickWindow = (ev: MouseEvent) => {
        if (ev.target instanceof HTMLElement && ev.target.tagName !== "SPAN")
          setActiveMenuIndex(-1);
      };

      document.addEventListener("click", handleClickWindow);

      return () => {
        document.removeEventListener("click", handleClickWindow);
      };
    })();
  }, []);
  return (
    <div className="basicContainer pt-4">
      <div className="w-full text-left py-4">
        <h2 className="text-lg">Publicaciones pendientes</h2>
      </div>
      <LargeTable columns={pendingPubsColumns} rowsData={[]}>
        {pendingPublications.map((store, i) => (
          <LargeRow index={i} key={i}>
            {pendingPubsColumns.map((column, j) => {
              if (column.key != "actions")
                return (
                  <li
                    className={`${column.class} py-2 ${column.rowClass}`}
                    key={j}
                  >
                    {store[column.key]}
                  </li>
                );
              else
                return (
                  <li
                    className={`${column.class}`}
                    key={j}
                    onClick={() => onClickMenu(i)}
                  >
                    <span className="cursor-pointer flex gap-1 justify-between py-2">
                      <span className="size-1 rounded-full bg-white"></span>
                      <span className="size-1 rounded-full bg-white"></span>
                      <span className="size-1 rounded-full bg-white"></span>
                    </span>
                  </li>
                );
            })}
            {i == activeMenuIndex ? (
              <Menu
                postPending={clickPostPending}
                store_id={store["_id"]}
                classname={
                  i == pendingPublications.length - 1 ? "bottom-3" : "top-3"
                }
              />
            ) : (
              <></>
            )}
          </LargeRow>
        ))}
      </LargeTable>
    </div>
  );
}

export default PendingPosting;
