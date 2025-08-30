import { useEffect, useState } from "react";
import { useSideBarStore } from "../../store/MenuStore";
import ItemsTable from "./components/ItemsTable";
import ActionsBar from "./components/ActionsBar";
import SearchBar from "./components/SearchBar";

const ItemsPage: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  const { setCurrentIndexPage } = useSideBarStore();
  const [loadingItems, setLoadingItems] = useState<boolean>(false);

  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentIndexPage(pageIndex);
  }, [currentPage]);

  return (
    <div className="basicContainer py-3">
      <div className="flex flex-col justify-end h-full w-full">
        <section className="w-[80%] mx-auto flex flex-col">
          <SearchBar
            setItems={setItems}
            setLoadingItems={setLoadingItems}
            className="mb-1"
            currentPage={currentPage}
          />
          <ActionsBar />
          <ItemsTable
            items={items}
            page={currentPage}
            loading={loadingItems}
            className="h-[calc(100vh-260px)] "
            onChangePage={(i) => {
              setCurrentPage(i);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default ItemsPage;
