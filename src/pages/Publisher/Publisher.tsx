import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";
import SendIcon from "../../assets/icons/SendIcon.svg";
import DropFileInput from "../../components/DropFile/DropFile";
import { useScraping } from "../../hooks/useScraping";
import { SubmitHandler, useForm } from "react-hook-form";
import CategoriesTree from "../../components/CategoriesTree/CategoriesTree";
import { parseCSV, validateObjects } from "../../utils/csvHelper";

import "./styles.css";

type Inputs = {
  sku: string;
  store_id: string;
};

const Publisher: React.FC = () => {
  const { user } = useAuth();
  // const { stores } = useShopStore();
  const [loading, setLoading] = useState(false);
  const { scrapeBySku, initializeScraping } = useScraping();

  const { register, handleSubmit, watch } = useForm<Inputs>();

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    await scrapeBySku(data.sku);
    setLoading(false);
  };

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    if (selectedFile && watch().store_id) {
      const parsedCsv = await parseCSV(selectedFile);
      const { valid } = validateObjects(parsedCsv);

      if (valid) {
        console.log("archivo válido");
        await initializeScraping({
          url_object_list: parsedCsv,
          store_id: watch().store_id,
        });
      } else {
        console.log("archivo inválido");
      }
    }
  };

  return (
    <div className="basicContainer gap-5">
      <span className="titlePageContainer">
        <h2>Publicador</h2>
      </span>
      <div className="w-full flex flex-col px-8 gap-8 h-max max-h-[calc(100vh-180px)] min-h-[440px]">
        <form
          className="flex gap-4 items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="inputBox max-w-72">
            <label htmlFor="">Tienda en la que desea publicar</label>
            <select
              className="select"
              {...register("store_id", { required: true })}
            >
              {user?.stores.map((store, i) => (
                <option key={i} value={store._id}>
                  {store.alias}
                </option>
              ))}
            </select>
          </span>
          <span className="inputBox max-w-52">
            <label htmlFor="">Publicar por SKU</label>
            <input
              type="text"
              className="input"
              placeholder="SKU del producto"
              {...register("sku", { required: true })}
            />
          </span>
          <button
            disabled={loading}
            className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] size-[34px] min-w-[34px]`}
          >
            {loading ? (
              <Spinner size={16} />
            ) : (
              <img src={SendIcon} alt="" width={18} height={18} />
            )}
          </button>
        </form>
        <p className="text-xl font-semibold">Publicador masivo</p>
        <div className="w-full flex justify-center">
          <DropFileInput onChange={handleFileInput}></DropFileInput>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-3 py-5 border-t border-gray-500">
        <p>Categorías de MercadoLibre</p>
        <CategoriesTree />
      </div>
    </div>
  );
};

export default Publisher;
