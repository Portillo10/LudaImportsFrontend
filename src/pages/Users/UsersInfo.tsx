import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import LargeTable from "../../components/LargeTable/LargeTable";
import LargeRow from "../../components/LargeTable/LargeRow";
import Spinner from "../../components/Spinner/Spinner";
import ModalStore from "./Modal/ModalStore";

const columns = [
  { key: "alias", class: "px-6 w-40", label: "Tienda" },
  {
    key: "reputation",
    class: "px-6 w-40 text-center",
    label: "Reputación",
  },
  {
    key: "total",
    class: "px-6 w-28 text-right",
    label: "Ventas",
  },
  {
    key: "publicationStartDate",
    class: "px-6 w-40 text-center",
    label: "Fecha de inicio",
  },
  { key: "actions", class: "px-3 w-16 cursor-pointer", label: "" },
];

const UsersInfoPage: React.FC = () => {
  const { user_id } = useParams();
  const { getStoresByUser } = useStores();
  const [loadingStores, setLoadingStores] = useState<boolean>(false);
  const [stores, setStores] = useState<Record<string, string | number>[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentStore, setCurrentStore] = useState<Record<
    string,
    string | number
  > | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      setLoadingStores(true);
      if (user_id) {
        const stores = await getStoresByUser(user_id);
        if (stores) {
          console.log(stores);
          setStores(stores);
        }
      }
      setLoadingStores(false);
    };
    loadStores();
  }, []);

  const handleClickDetails = (store: Record<string, string | number>) => {
    setCurrentStore(store);
    setOpenModal(true);
  };

  const renderRow = (store: Record<string, string | number>) => {
    const items = columns.map((column) => {
      let label = "";
      if (column.key == "actions") {
        return (
          <li
            onClick={() => handleClickDetails(store)}
            className={column.class}
          >
            ---
          </li>
        );
      } else if (column.key == "reputation") {
        if (store[column.key]) {
          label = store[column.key].toString();
        } else {
          label = "Sin reputación";
        }
      } else if (column.key == "publicationStartDate") {
        if (store[column.key]) {
          label = new Date(store[column.key].toString()).toLocaleDateString();
        } else {
          label = "Nunca";
        }
      } else if (
        store[column.key] !== undefined &&
        store[column.key] !== null
      ) {
        label = store[column.key].toString();
      }

      return <li className={column.class}>{label}</li>;
    });

    return items;
  };

  return (
    <div className="basicContainer pt-8">
      {!loadingStores ? (
        <LargeTable columns={columns} rowsData={[]}>
          {stores.map((store, i) => (
            <LargeRow index={i} key={i}>
              {renderRow(store)}
            </LargeRow>
          ))}
        </LargeTable>
      ) : (
        <Spinner />
      )}
      <ModalStore
        close={() => setOpenModal(false)}
        openModal={openModal}
        store={currentStore}
      ></ModalStore>
    </div>
  );
};

export default UsersInfoPage;
