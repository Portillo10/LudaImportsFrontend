import { useEffect } from "react";
import UpdateStoreItem from "../../components/UpdateStoreItem/UpdateStoreItem";
import { useStores } from "../../hooks/useStores";
import { usePriceUpdating } from "../../hooks/usePriceUpdating";

import ItemSkeleton from "../../components/UpdateStoreItem/ItemSkeleton";

import Spinner from "../../components/Spinner/Spinner";
import UpdatePricesForm from "./UpdatePricesForm";
import UpdateProgressPanel from "./UpdateProgressPanel";

import "./styles.css";

const UpdatePrices: React.FC = () => {
  const { stores, getAllStores, renderSkeletons, loading } = useStores();
  const {
    getUsdRate,
    updatePrices,
    getUpdateProgress,
    usdRate,
    loadingProgress,
    priceUpdatingInfo,
  } = usePriceUpdating();

  useEffect(() => {
    getAllStores();
    getUsdRate();
    getUpdateProgress();
  }, []);

  const onSubmit = async (data: any) => {
    const storesToUpdate = stores
      .filter((store) => store.allowUpdate)
      .map((store) => store._id);
    await updatePrices(storesToUpdate, data);
  };

  return (
    <div className="basicContainer gap-4 fade-in px-6">
      <span className="titlePageContainer">
        <h2>Actualizar precios</h2>
      </span>
      <div className="mainContainer">
        <section className="storesContainer">
          <p className="text-lg font-semibold pb-2">Tiendas a actualizar</p>
          {!loading
            ? stores.map((store, i) => (
                <UpdateStoreItem key={i} store={store} />
              ))
            : renderSkeletons().map((num) => <ItemSkeleton key={num} />)}
        </section>
        <section className="infoBlockContainer">
          <div className="flex flex-col gap-1.5">
            <span className="infoBlock bg-[#214F3F]">
              <p>Precio del dolar hoy</p>
              {usdRate ? (
                <span className="flex items-center gap-2">
                  {usdRate}
                  COP
                </span>
              ) : (
                <Spinner size={32} />
              )}
            </span>
            <span className="infoBlock bg-[#1E3A5F]">
              <p>Última actualización</p>
              <span>{new Date().toLocaleDateString()}</span>
            </span>
          </div>
          <hr className="w-full border-none h-px bg-gray-500 my-6" />
          {loadingProgress && !priceUpdatingInfo ? (
            <div className="w-full h-40 flex items-center justify-center">
              <Spinner />
            </div>
          ) : priceUpdatingInfo &&
            priceUpdatingInfo.trackingProgress.status == "stopped" &&
            priceUpdatingInfo.singleProgress.status == "stopped" &&
            priceUpdatingInfo.updatingProgress.status == "stopped" ? (
            <UpdatePricesForm onSubmit={onSubmit} />
          ) : (
            <UpdateProgressPanel
              refreshUpdatingProgress={getUpdateProgress}
              updatingProgress={priceUpdatingInfo}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default UpdatePrices;
