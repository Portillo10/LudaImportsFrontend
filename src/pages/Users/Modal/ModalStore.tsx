import { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { useMLApi } from "../../../hooks/useMLApi";
import TransferProducts from "./StoreActions.tsx/TransferProducts";
import DeleteItems from "./StoreActions.tsx/DeleteItems";

type ModalProps = {
  openModal: boolean;
  store: Record<string, string | number> | null;
  close: () => void;
};

// const actions = [
//   {
//     name: "sincronize",
//     label: "Sincronizar productos",
//   },
//   {
//     name: "posting",
//     label: "Publicar pendientes",
//   },
//   {
//     name: "delete-forbbiden",
//     label: "Eliminar marcas prohibidas",
//   },
//   {
//     name: "delete-all",
//     label: "Eliminar todos los productos",
//   },
//   {
//     name: "transfer-products",
//     label: "Transferir productos",
//   },
// ];

const ModalStore: React.FC<ModalProps> = ({ store, openModal, close }) => {
  // const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>(
  //   {
  //     posting: false,
  //     scraping: false,
  //     sincronize: false,
  //   }
  // );
  const { getPostingProgress } = useMLApi();

  useEffect(() => {
    const getProgress = async () => {
      if (openModal) {
        await getPostingProgress();
      }
    };

    getProgress();
  }, [openModal]);

  // const handleSync = async (store_id: string) => {
  //   const progress = await getSyncStoreProgress(store_id);
  //   if (!progress || !progress.inProgress) {
  //     await sincronizeStore(store_id);
  //   } else {
  //   }
  //   console.log(progress);
  // };

  // const handleClickAction = async (name: string) => {
  //   const currentLoading = loadingActions;
  //   currentLoading[name] = true;
  //   setLoadingActions(currentLoading);
  //   await sleep(2000);
  //   currentLoading[name] = false;
  //   setLoadingActions(currentLoading);
  //   if (!store) return null;
  //   if (name == "scraping") {
  //     await handleScraping(store["_id"].toString());
  //   } else if (name == "pause") {
  //     await pauseScraping();
  //   } else if (name == "posting") {
  //     await postPendingProducts(store["_id"].toString());
  //   } else if (name == "sincronize") {
  //     await handleSync(store["_id"].toString());
  //   } else if (name == "delete-forbbiden") {
  //     await handleDeleteProducts(store["_id"].toString());
  //   } else if (name == "delete-all") {
  //     await handleDeleteAllProducts(store["_id"].toString());
  //   } else if (name == "transfer-products") {
  //   }
  // };

  if (store)
    return (
      <Modal
        isOpen={openModal}
        onClose={close}
        title={store ? store["alias"].toString() : undefined}
      >
        <div className="w-full h-full flex flex-col items-center">
          <section className="w-full flex flex-col items-center">
            <TransferProducts store_id={store["_id"].toString()} />
            <DeleteItems></DeleteItems>
            {/* {actions.map((action) => (
            <div className="w-full flex flex-col items-center transition-all">
              <span
                onClick={() => handleClickAction(action.name)}
                className="flex justify-between p-4 w-full cursor-pointer border-t border-slate-600 hover:bg-slate-700"
              >
                <p>{action.label}</p>
                {loadingActions[action.name] ? <Spinner size={16} /> : <></>}
              </span>
              {progress[action.name]?.inProgress ? (
                <div className="flex flex-col"></div>
              ) : (
                <></>
              )}
            </div>
          ))} */}
          </section>
        </div>
      </Modal>
    );
};

export default ModalStore;
