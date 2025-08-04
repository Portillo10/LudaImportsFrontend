import { useEffect, useState } from "react";
import { useSideBarStore } from "../../store/MenuStore";
import ItemsTable from "./components/ItemsTable";
import { useStores } from "../../hooks/useStores";
import { useParams } from "react-router-dom";

const ItemsPage: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  const { store_id } = useParams();
  const { setCurrentIndexPage } = useSideBarStore();
  const { searchItems } = useStores();

  const [filters, setFilters] = useState<any>({
    productStoreFilters: {
      state: { $in: ["active", "paused"] },
    },
    productFilters: {},
    projection: {
      error: 0,
      weight: 0,
      profit: 0,
      store_id: 0,
      dimensions: 0,
      postedDate: 0,
      priceInUSD: 0,
      attributes: 0,
      description: 0,
      profitPercent: 0,
      shipmentPrice: 0,
      amazonCategory: 0,
      lastUpdatePrice: 0,
    },
  });

  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const loadItems = async () => {
    if (store_id) {
      const response = await searchItems(store_id, filters, {
        page: currentPage,
      });
      if (response) {
        setItems(response.data);
        console.log(response.data);
        setTotalItems(response.total);
      }
    }
  };

  const onChangeFilters = () => {
    setFilters({});
    console.log(totalItems);
  };

  useEffect(() => {
    setCurrentIndexPage(pageIndex);
    loadItems();
  }, [currentPage]);

  return (
    <div className="basicContainer py-3">
      <div className="flex flex-col justify-end h-full">
        <section></section>
        <section onClick={onChangeFilters}></section>
        <section className="">
          <ItemsTable
            items={items}
            page={currentPage}
            className="h-[calc(100vh-260px)] w-[710px]"
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
