import { Search } from "lucide-react";
import { useUserAction } from "../../hooks/useUserAction";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import DropFileInput from "../../components/DropFile/DropFile";
// import LoadingBar from "../../components/LoadingBar/LoadingBar";
import { useSideBarStore } from "../../store/MenuStore";
import { useScraping } from "../../hooks/useScraping";
// import Toast from "../../components/Toast/Toast";
import { parseTSVFromFile, validateObjects } from "../../utils/tsvHelper";

const PublisherPanel: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const { setCurrentIndexPage } = useSideBarStore();

  const {
    queue,
    // loadQueue,
    // getStoreAction,
    // pendingActionsCount,
    // completedActionsCount,
  } = useUserAction();

  const { loadTasks, hasPendingTasks, getScrapingProgress } = useScraping();

  const [userAction, setUserAction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { store_id } = useParams();

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);

    const selectedFile = event.target.files?.item(0);
    if (selectedFile && store_id) {
      const parsedCsv = await parseTSVFromFile(selectedFile);
      const { validObjects } = validateObjects(parsedCsv);
      console.log(validObjects.length);
      const response = await loadTasks(validObjects, store_id);
      if (response) {
        setUserAction({ status: "PENDING" });
      }
    }
    setLoading(false);
  };

  const loadScrapingProgress = async () => {
    if (store_id) {
      const response = await getScrapingProgress(store_id);
      if (
        response?.scrapingProgress.status == "running" &&
        response?.scrapingProgress.targetStore == store_id
      ) {
        setUserAction({
          status: "IN_PROGRESS",
        });
        return { inProgress: true };
      }
    }
    return { inProgress: false };
  };

  const checkPendingTasks = async () => {
    if (store_id) {
      const hasPending = await hasPendingTasks(store_id);
      if (hasPending) {
        setUserAction({
          status: "PENDING",
        });
      }
    }
  };

  const initPage = async () => {
    setLoading(true);
    const { inProgress } = await loadScrapingProgress();

    if (!inProgress) {
      await checkPendingTasks();
    }

    setLoading(false);
  };

  useEffect(() => {
    // loadActions();
    initPage();
    setCurrentIndexPage(pageIndex || 1);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner></Spinner>
      </div>
    );
  }

  if (userAction && userAction.status === "PENDING") {
    return (
      <div className="flex flex-col items-center pt-12">
        <div>
          <h2 className="mb-4 text-lg">
            Ya subiste un archivo, debes esperar a que se analice y se extraigan
            los productos para subir otro archivo
          </h2>
          <h2 className="mb-4 text-center">
            Cuando tu archivo se esté analizando podrás ver el progreso aquí.
            <br />
            Puedes cerrar la página y consultar el progreso más tarde.
          </h2>
        </div>
        {/* <div className="w-2/5">
          <LoadingBar
            progress={completedActionsCount}
            total={completedActionsCount + pendingActionsCount}
            label="Esperando en la cola..."
          ></LoadingBar>
        </div> */}
      </div>
    );
  }

  if (userAction && userAction.status === "IN_PROGRESS") {
    return (
      <div className="flex justify-center gap-4 p-4">
        <section className="bg-[#393B41] p-6 rounded-md shadow-md shadow-neutral-800 flex flex-col gap-8 w-2/6">
          <div className="flex gap-2 items-center">
            <Search size={18} />
            <h2 className="text-lg">Buscando productos...</h2>
          </div>
          <div className="px-4">
            <p className="text-slate-300">Productos encontrados</p>
            <p className="text-2xl mt-1">0</p>
          </div>
          <div className="px-4">
            <p className="text-slate-300">Productos extraídos</p>
            <p className="text-2xl mt-1">0</p>
          </div>
          <div className="px-4">
            <p className="text-slate-300">Productos publicados</p>
            <p className="text-2xl mt-1">0</p>
          </div>
          <div className="flex justify-center">
            <button className="cursor-pointer rounded-md bg-red-600 hover:bg-red-700 py-2 px-4 transition-all">
              Cancelar
            </button>
          </div>
        </section>
        {/* <section className="bg-[#393B41] w-full p-6 col-span-3 rounded-md shadow-md shadow-neutral-800"></section> */}
      </div>
    );
  }

  if (!userAction) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-64 gap-4 px-6 ">
          <div>
            <h2>
              Sube un archivo con los links de los productos que deseas publicar
              para iniciar el proceso de extracción de productos.
            </h2>
            <p className="text-sm text-gray-300">
              Tipos de archivo permitidos:{" "}
              <strong>separados por tabulaciones (.tsv)</strong>
            </p>
          </div>
          <DropFileInput
            className="w-4/5"
            onChange={handleFileInputChange}
          ></DropFileInput>
        </div>
      </>
    );
  }
};
export default PublisherPanel;
