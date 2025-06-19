import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import LargeTable from "../../components/LargeTable/LargeTable";
import LargeRow from "../../components/LargeTable/LargeRow";
import Spinner from "../../components/Spinner/Spinner";

import Menu, { OptionProps } from "../../components/Menu/Menu";
import { useSubscription } from "../../hooks/useSubscription";
import Toast from "../../components/Toast/Toast";
import { getStatusInfo } from "../../utils/statusHelper";
import ConfirmModal from "../../components/ConfirmModal";

const columns = [
  { key: "alias", class: "px-2 w-40 text-base font-normal", label: "Tienda" },
  {
    key: "total",
    class: "px-2 w-28 text-right",
    label: "Ventas",
  },
  {
    key: "publicationStartDate",
    class: "px-2 w-40 text-center",
    label: "Fecha de publicación",
  },
  {
    key: "subscriptionStartDate",
    class: "px-2 w-40 text-center",
    label: "Fecha de inicio",
  },
  {
    key: "subscriptionEndDate",
    class: "px-2 w-40 text-center",
    label: "Fecha de pago",
  },
  {
    key: "subscriptionStatus",
    class: "px-2 w-40 text-center",
    label: "Estado",
  },
  { key: "actions", class: "w-7", label: "" },
];

const UsersInfoPage: React.FC = () => {
  const { user_id } = useParams();
  const { getStoresByUser } = useStores();
  const {
    activeToast,
    closeToast,
    startSubscription,
    renewSubscription,
    cancelSubscription,
    toastMsg,
    toastType,
  } = useSubscription();
  const [stores, setStores] = useState<any[]>([]);
  const [loadingStores, setLoadingStores] = useState<boolean>(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(-1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [toCancelStore, setToCancelStore] = useState<string | undefined>();

  const onClickMenu = (index: number) => {
    if (activeMenuIndex == index) {
      setActiveMenuIndex(-1);
    } else {
      setActiveMenuIndex(index);
    }
  };

  const updateSubscription = (subscription: any) => {
    const newData = stores.map((store) => {
      if (store["_id"] == subscription.store_id) {
        return {
          ...store,
          subscriptionStartDate: subscription.startDate,
          subscriptionEndDate: subscription.endDate,
          subscriptionStatus: subscription.status,
        };
      } else {
        return store;
      }
    });

    setStores(newData);
  };

  useEffect(() => {
    const loadStores = async () => {
      setLoadingStores(true);
      if (user_id) {
        const stores = await getStoresByUser(user_id);
        if (stores) {
          setStores(stores);
        }
      }
      setLoadingStores(false);
    };
    loadStores();
  }, []);

  useEffect(() => {
    const handleClickWindow = (ev: MouseEvent) => {
      if (ev.target instanceof HTMLElement && ev.target.tagName !== "SPAN")
        setActiveMenuIndex(-1);
    };
    document.addEventListener("click", handleClickWindow);

    return () => {
      document.removeEventListener("click", handleClickWindow);
    };
  }, []);

  const renderRow = (store: Record<string, string | number>, index: number) => {
    let rowOptions: OptionProps[] = [];

    let status: string | undefined;
    let labelStatus = "";

    const endDate = store["subscriptionEndDate"]
      ? new Date(store["subscriptionEndDate"])
      : null;
    const graceUntil = store["subscriptionGraceUntil"]
      ? new Date(store["subscriptionGraceUntil"])
      : null;

    if (endDate && graceUntil) {
      const { status: _, label: statusLabel } = getStatusInfo({
        endDate,
        graceUntil,
        status: store["subscriptionStatus"].toString(),
      });
      status = _;
      labelStatus = statusLabel;
    }

    if (!status) {
      const option: OptionProps = {
        click: async (store_id) => {
          const response = await startSubscription(store_id);
          if (response) updateSubscription(response.subscription);
        },
        label: "Iniciar membresía",
      };

      rowOptions.unshift(option);
    }

    if (status && status != "active") {
      rowOptions.push({
        click: async (store_id) => {
          const response = await renewSubscription(store_id);
          if (response) updateSubscription(response.subscription);
        },
        label: "Renovar membresía",
      });
    }

    if (status) {
      rowOptions.push({
        label: "Calcular utilidades",
        click: async (store_id) => {
          console.log(store_id);
        },
      });
    }

    if (status == "active" || status == "grace") {
      rowOptions.push({
        click: async (store_id) => {
          setToCancelStore(store_id);
          setOpenModal(true);
          // const response = await cancelSubscription(store_id);
          // if (response) updateSubscription(response.subscription);
        },
        label: "Cancelar membresía",
      });
    }

    const items = columns.map((column, i) => {
      let label = "";
      if (column.key == "actions") {
        return (
          <li
            key={i}
            onClick={() => onClickMenu(index)}
            className={`${column.class}`}
          >
            <Menu
              side="left"
              store_id={store["_id"].toString()}
              active={activeMenuIndex == index}
              options={rowOptions}
            />
          </li>
        );
      } else if (
        (column.key == "publicationStartDate" ||
          column.key == "subscriptionStartDate" ||
          column.key == "subscriptionEndDate") &&
        store[column.key]
      ) {
        label = new Date(store[column.key].toString()).toLocaleDateString();
      } else if (column.key == "subscriptionStatus" && status) {
        label = labelStatus;
      } else if (
        store[column.key] !== undefined &&
        store[column.key] !== null
      ) {
        label = store[column.key].toString();
      }

      if (label == "") {
        if (column.key == "total") {
          label = "0";
        } else if (column.key == "publicationStartDate") {
          label = "Nunca";
        } else {
          label = "Sin membresía";
        }
      }

      return (
        <li key={i} className={`${column.class} py-3 `}>
          {label}
        </li>
      );
    });

    return items;
  };

  return (
    <>
      <div className="basicContainer pt-8 px-6">
        {!loadingStores ? (
          <LargeTable classname="fade-in" columns={columns} rowsData={[]}>
            {stores.map((store, i) => (
              <LargeRow index={i} key={i}>
                {renderRow(store, i)}
              </LargeRow>
            ))}
          </LargeTable>
        ) : (
          <div className="w-full flex justify-center mt-16">
            <Spinner />
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={openModal}
        message=""
        title="¿Seguro que desea cancelar la membresía?"
        onCancel={() => setOpenModal(false)}
        onConfirm={async () => {
          if (toCancelStore) {
            const response = await cancelSubscription(toCancelStore);
            if (response) updateSubscription(response.subscription);
          }
          setOpenModal(false);
        }}
      />
      {activeToast && (
        <Toast message={toastMsg} onClose={closeToast} type={toastType} />
      )}
    </>
  );
};

export default UsersInfoPage;
