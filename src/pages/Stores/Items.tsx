import { useEffect, useState } from "react";
import { useSideBarStore } from "../../store/MenuStore";
import ItemsTable from "./components/ItemsTable";
import ActionsBar from "./components/ActionsBar";
import SearchBar from "./components/SearchBar";
import FiltersModal from "./modals/FiltersModal";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import ConfirmModal from "../../components/ConfirmModal";
import { formatNumberWithSpace } from "../../utils/helpers";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";

const defaultFilters = {
  productStore: {
    state: { $in: ["active", "paused"] },
    subStatus: "",
  },
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
};

const ItemsPage: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  const [items, setItems] = useState<any[]>([]);
  const [modalTilte, setModalTilte] = useState("¿Estás seguro?");
  const [modalMessage, setModalMessage] = useState("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmModalLoading, setIsConfirmModalLoading] = useState(false);
  const [cononfirmModalType, setConfirmModalType] = useState<string>("");

  const { store_id } = useParams();
  const {
    searchItems,
    deleteItems,
    pauseItems,
    toastMsg,
    toastType,
    closeToast,
    activeToast: isToastOpen,
  } = useStores();
  const { setCurrentIndexPage } = useSideBarStore();
  const [filters, setFilters] = useState<any>(defaultFilters);

  const loadItems = async (queryFilters: any) => {
    setLoadingItems(true);
    if (store_id) {
      const response = await searchItems(
        store_id,
        { ...queryFilters },
        {
          page: currentPage,
        }
      );
      if (response) {
        setItems(response.data);
        setTotalItems(response.total);
        if (setTotalPages) setTotalPages(response.totalPages);
      }
    }
    setLoadingItems(false);
  };

  const onDeleteItems = async () => {
    if (store_id) {
      setIsConfirmModalLoading(true);
      await deleteItems(store_id, { query: filters });
      setIsConfirmModalLoading(false);
    }
  };

  const onPauseItems = async () => {
    if (store_id) {
      console.log("se fue");
      setIsConfirmModalLoading(true);
      await pauseItems(store_id, { query: filters });
      setIsConfirmModalLoading(false);
    }
  };

  const onApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    loadItems(newFilters);
    setIsFiltersModalOpen(false);
  };

  const onClickDelete = () => {
    setConfirmModalType("delete");
    setModalMessage(
      `${formatNumberWithSpace(totalItems)} productos serán eliminados, esta acción es irreversible.`
    );
    setIsConfirmModalOpen(true);
  };

  const onClickPause = async () => {
    if (store_id == undefined) return;

    setIsConfirmModalLoading(true);
    let totalActiveItems = totalItems;
    const hasMoreStates = filters.productStore.state.$in.length > 1;
    if (hasMoreStates) {
      totalActiveItems = (
        await searchItems(
          store_id,
          {
            ...filters,
            productStore: {
              ...filters.productStore,
              state: { $in: ["active"] },
            },
          },
          {}
        )
      ).total;
    }
    setConfirmModalType("pause");
    setModalTilte("¿Estás seguro?");
    setModalMessage(
      `${formatNumberWithSpace(totalActiveItems)} productos serán pausados${hasMoreStates ? ", sólo los productos activos serán pausados." : "."}`
    );
    setIsConfirmModalLoading(false);
    setIsConfirmModalOpen(true);
  };

  const onClickReactivate = async () => {
    if (store_id == undefined) return;
    setIsConfirmModalLoading(true);

    let totalActiveItems = totalItems;
    const hasMoreStates = filters.productStore.state.$in.length > 1;
    if (hasMoreStates) {
      totalActiveItems = (
        await searchItems(
          store_id,
          {
            ...filters,
            productStore: {
              ...filters.productStore,
              state: { $in: ["paused"] },
            },
          },
          {}
        )
      ).total;
    }
    setModalTilte("¿Estás seguro?");
    setModalMessage(
      `${formatNumberWithSpace(totalActiveItems)} productos serán reactivados${hasMoreStates ? ", sólo los productos pausados serán reactivados." : "."}`
    );
    setIsConfirmModalLoading(false);
    setIsConfirmModalOpen(true);
  };

  const onClickRepublish = async () => {
    if (store_id == undefined) return;
    setIsConfirmModalLoading(true);

    let totalActiveItems = totalItems;
    const hasMoreStates = filters.productStore.state.$in.length > 1;
    if (hasMoreStates) {
      totalActiveItems = (
        await searchItems(
          store_id,
          {
            ...filters,
            productStore: {
              ...filters.productStore,
              state: { $in: ["under_review"] },
            },
          },
          {}
        )
      ).total;
    }
    setModalTilte("¿Estás seguro? Pueden haber productos con infracciones");
    setModalMessage(
      `${formatNumberWithSpace(totalActiveItems)} productos serán publicados de nuevo${hasMoreStates ? ", sólo los productos inactivos serán publicados." : "."}`
    );
    setIsConfirmModalLoading(false);
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    setCurrentIndexPage(pageIndex);
  }, []);

  useEffect(() => {
    loadItems(filters);
  }, [currentPage]);

  return (
    <div className="basicContainer py-3 fade-in">
      <div className="flex flex-col justify-end h-full w-full">
        <section className="w-[80%] mx-auto flex flex-col">
          <SearchBar
            className="mb-1"
            total={totalItems}
            openFiltersModal={() => setIsFiltersModalOpen(true)}
          />
          <ActionsBar
            onDelete={onClickDelete}
            onPause={onClickPause}
            onReactivate={onClickReactivate}
            onRepublish={onClickRepublish}
            disabledReactivate={
              totalItems === 0 ||
              (!filters.productStore.state.$in.includes("paused") &&
                filters.productStore.state.$in.length)
            }
            disabledPause={
              totalItems === 0 ||
              (!filters.productStore.state.$in.includes("active") &&
                filters.productStore.state.$in.length)
            }
            disabledDelete={totalItems === 0}
            disabledRepublish={
              totalItems === 0 ||
              (!filters.productStore.state.$in.includes("under_review") &&
                filters.productStore.state.$in.length)
            }
          />
          <ItemsTable
            items={items}
            page={currentPage}
            loading={loadingItems}
            totalPages={totalPages}
            className="h-[calc(100vh-260px)] "
            onChangePage={(i) => {
              setCurrentPage(i);
            }}
          />
        </section>
      </div>
      <FiltersModal
        filters={filters}
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApply={onApplyFilters}
      />
      {isConfirmModalLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      ) : (
        <ConfirmModal
          title={modalTilte}
          message={modalMessage}
          isOpen={isConfirmModalOpen}
          isLoading={isConfirmModalLoading}
          onCancel={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            if (cononfirmModalType == "delete") {
              onDeleteItems();
            } else if (cononfirmModalType == "pause") {
              onPauseItems();
            }
            setIsConfirmModalOpen(false);
          }}
        />
      )}
      {isToastOpen && (
        <Toast
          message={toastMsg}
          onClose={closeToast}
          type={toastType || "warning"}
        />
      )}
    </div>
  );
};

export default ItemsPage;
