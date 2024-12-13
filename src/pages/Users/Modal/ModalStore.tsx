import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { sleep } from "../../../utils/helpers";
import Spinner from "../../../components/Spinner/Spinner";
import { useScraping } from "../../../hooks/useScraping";
import { useMLApi } from "../../../hooks/useMLApi";

type ModalProps = {
  openModal: boolean;
  store: Record<string, string | number> | null;
  close: () => void;
};

const actions = [
  {
    name: "sincronize",
    label: "Sincronizar productos",
  },
  {
    name: "posting",
    label: "Publicar pendientes",
  },
  {
    name: "scraping",
    label: "Scrapear pendientes",
  },
  {
    name: "pause",
    label: "Pausar scraping",
  },
  {
    name: "delete-forbbiden",
    label: "Eliminar marcas prohibidas",
  },
];

const ModalStore: React.FC<ModalProps> = ({ store, openModal, close }) => {
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>(
    {
      posting: false,
      scraping: false,
      sincronize: false,
    }
  );
  const { runTasks, pauseScraping } = useScraping();
  const {
    postPendingProducts,
    getPostingProgress,
    getPostingProgressByStore,
    getSyncStoreProgress,
    sincronizeStore,
    deleteForbbidenProducts,
    progress,
  } = useMLApi();

  useEffect(() => {
    const getProgress = async () => {
      if (openModal) {
        await getPostingProgress();
      }
    };

    getProgress();
  }, [openModal]);

  const handleScraping = async (store_id: string) => {
    const progress = await getPostingProgressByStore(store_id);
    if (!progress) {
      await runTasks(store_id);
    }
  };

  const handleSync = async (store_id: string) => {
    const progress = await getSyncStoreProgress(store_id);
    if (!progress || !progress.inProgress) {
      await sincronizeStore(store_id);
    } else {
    }
    console.log(progress);
  };

  const handleDeleteProducts = async (store_id: string) => {
    await deleteForbbidenProducts(store_id);
  };

  const handleClickAction = async (name: string) => {
    const currentLoading = loadingActions;
    currentLoading[name] = true;
    setLoadingActions(currentLoading);
    await sleep(2000);
    currentLoading[name] = false;
    setLoadingActions(currentLoading);
    if (!store) return null;
    if (name == "scraping") {
      await handleScraping(store["_id"].toString());
    } else if (name == "pause") {
      await pauseScraping();
    } else if (name == "posting") {
      await postPendingProducts(store["_id"].toString());
    } else if (name == "sincronize") {
      await handleSync(store["_id"].toString());
    } else if (name == "delete-forbbiden") {
      await handleDeleteProducts(store["_id"].toString());
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onClose={close}
      title={store ? store["alias"].toString() : undefined}
    >
      <div className="w-full h-full flex flex-col items-center">
        <section className="w-full flex flex-col items-center">
          {actions.map((action) => (
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
          ))}
        </section>
      </div>
    </Modal>
  );
};

export default ModalStore;
