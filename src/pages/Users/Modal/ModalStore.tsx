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
  const { postPendingProducts, getPostingProgress } = useMLApi();

  useEffect(() => {
    const getProgress = async () => {
      if (openModal) {
        await getPostingProgress();
      }
    };

    getProgress();
  }, [openModal]);

  const handleClickAction = async (name: string) => {
    const currentLoading = loadingActions;
    currentLoading[name] = true;
    setLoadingActions(currentLoading);
    await sleep(2000);
    currentLoading[name] = false;
    setLoadingActions(currentLoading);
    if (name == "scraping" && store) {
      await runTasks(store["_id"].toString());
    } else if (name == "pause") {
      await pauseScraping();
    } else if (name == "posting" && store) {
      await postPendingProducts(store["_id"].toString());
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
            <span
              onClick={() => handleClickAction(action.name)}
              className="flex justify-between p-4 w-full cursor-pointer border-t border-slate-600 hover:bg-slate-700"
            >
              <p>{action.label}</p>
              {loadingActions[action.name] ? <Spinner size={16} /> : <></>}
            </span>
          ))}
        </section>
      </div>
    </Modal>
  );
};

export default ModalStore;
