import { Search } from "lucide-react";
import { useUserAction } from "../../hooks/useUserAction";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import DropFileInput from "../../components/DropFile/DropFile";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

const PublisherPanel: React.FC = () => {
  const {
    queue,
    loadQueue,
    getStoreAction,
    pendingActionsCount,
    completedActionsCount,
  } = useUserAction();
  const [userAction, setUserAction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.item(0);

    if (selectedFile) {
    } else {
      console.log("ningun archivo fue subido");
    }
  };

  const loadActions = async () => {
    setLoading(true);
    const store_id = searchParams.get("store_id");
    const action = await getStoreAction(store_id || "");
    if (action) {
      setUserAction(action);
      await loadQueue(action._id);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadActions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner></Spinner>
      </div>
    );
  }

  if (userAction && userAction.status === "PENDING" && queue.length > 0) {
    return (
      <div className="flex flex-col items-center pt-12">
        <div>
          <h2 className="mb-4 text-center">
            Cuando llegue tu turno podrás ver el progreso aquí.
            <br />
            Puedes cerrar la página y consultar el progreso más tarde.
          </h2>
        </div>
        <div className="w-2/5">
          <LoadingBar
            progress={completedActionsCount}
            total={completedActionsCount + pendingActionsCount}
            label="Esperando en la cola..."
          ></LoadingBar>
        </div>
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
            <p className="text-2xl mt-1">9.122</p>
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
      <div className="flex flex-col items-center justify-center h-64 gap-4 px-6 ">
        <div>
          <h2>
            Sube un archivo con los links de los productos que deseas publicar
            para iniciar el proceso de extracción de productos.
          </h2>
          <p className="text-sm text-gray-300">
            Tipos de archivo permitidos:{" "}
            <strong>separados por tabulaciones (.tsv) y Excel (.xlsx)</strong>
          </p>
        </div>
        <DropFileInput
          className="w-4/5"
          onChange={handleFileInputChange}
        ></DropFileInput>
      </div>
    );
  }
};
export default PublisherPanel;
