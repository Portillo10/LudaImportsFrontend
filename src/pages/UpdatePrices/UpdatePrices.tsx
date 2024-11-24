import { useEffect } from "react";
import UpdateStoreItem from "../../components/UpdateStoreItem/UpdateStoreItem";
import { useStores } from "../../hooks/useStores";
import { usePriceUpdating } from "../../hooks/usePriceUpdating";

import "./styles.css";

const UpdatePrices: React.FC = () => {
  const { stores, getAllStores } = useStores();
  const { getUsdRate, usdRate } = usePriceUpdating();

  useEffect(() => {
    getAllStores();
    getUsdRate();
  }, []);

  return (
    <div className="basicContainer gap-4">
      <span className="titlePageContainer">
        <h2>Actualizar precios</h2>
      </span>
      <div className="flex w-full gap-16">
        <section className="bg-[#232427] border border-[#5A5B60] p-4 rounded-lg flex flex-col gap-2 max-h-[calc(100vh-160px)] overflow-auto">
          <p className="text-lg font-semibold pb-2">Tiendas a actualizar</p>
          {stores.map((store, i) => (
            <UpdateStoreItem key={i} store={store} />
          ))}
        </section>
        <section className="flex flex-col w-5/12">
          <div className="flex flex-col gap-1.5">
            <span className="infoBlock bg-[#214F3F]">
              <p>Precio del dolar hoy</p>
              <span>{usdRate} COP</span>
            </span>
            <span className="infoBlock bg-[#1E3A5F]">
              <p>Última actualización</p>
              <span>{new Date().toLocaleDateString()}</span>
            </span>
          </div>

          <div></div>
        </section>
      </div>
    </div>
  );
};

export default UpdatePrices;
