import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import LargeTable from "../../components/LargeTable/LargeTable";
import LargeRow from "../../components/LargeTable/LargeRow";
import Spinner from "../../components/Spinner/Spinner";

import Menu, { OptionProps } from "../../components/Menu/Menu";
import { useSubscription } from "../../hooks/useSubscription";
import Toast from "../../components/Toast/Toast";

const columns = [
  { key: "alias", class: "px-2 w-40", label: "Tienda" },
  {
    key: "total",
    class: "px-2 w-28 text-right",
    label: "Ventas",
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

  const options: OptionProps[] = [
    {
      click: async (store_id) => {
        await renewSubscription(store_id);
      },
      label: "Renovar membresía",
    },
    {
      click: async (store_id) => {
        await cancelSubscription(store_id);
      },
      label: "Cancelar membresía",
    },
    {
      label: "Calcular utilidades",
      click: async (store_id) => {
        console.log(store_id);
      },
    },
  ];

  const renderRow = (store: Record<string, string | number>, index: number) => {
    let rowOptions = [...options];
    if (!store["subscriptionStartDate"]) {
      const option: OptionProps = {
        click: async (store_id) => {
          const response = await startSubscription(store_id);
          if (response.subscription) updateSubscription(response.subscription);
        },
        label: "Iniciar membresía",
      };

      rowOptions.shift();
      rowOptions.shift();
      rowOptions.unshift(option);
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
        column.key == "subscriptionStartDate" ||
        column.key == "subscriptionEndDate"
      ) {
        if (store[column.key]) {
          label = new Date(store[column.key].toString()).toLocaleDateString();
        } else {
          label = "Sin membresía";
        }
      } else if (column.key == "subscriptionStatus") {
        label = store[column.key]
          ? store[column.key].toString()
          : "Sin membresía";
      } else if (
        store[column.key] !== undefined &&
        store[column.key] !== null
      ) {
        label = store[column.key].toString();
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
      {activeToast && (
        <Toast message={toastMsg} onClose={closeToast} type={toastType} />
      )}
    </>
  );
};

export default UsersInfoPage;
