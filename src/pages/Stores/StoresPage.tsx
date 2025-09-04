import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import ShopIcon from "../../assets/icons/ShopIcon.svg";
import StatsCard from "../../components/StoreCard/StoreCard";
import { useStores } from "../../hooks/useStores";
import { IStore } from "../../types/store";
import Spinner from "../../components/Spinner/Spinner";
import { useSideBarStore } from "../../store/MenuStore";

const StoresPage: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const { user } = useAuth();

  const { getStoresByUser } = useStores();
  const [loadingStores, setLoadingStores] = useState<boolean>(true);
  const [stores, setStores] = useState<IStore[]>([]);
  const { setCurrentIndexPage } = useSideBarStore();

  useEffect(() => {
    setCurrentIndexPage(pageIndex || 1);

    const loadStores = async () => {
      setLoadingStores(true);
      if (user) {
        const response = await getStoresByUser(user._id);
        if (response?.stores) {
          setStores(response.stores);
        }
      }
      setLoadingStores(false);
    };
    loadStores();
  }, []);

  if (user) {
    if (user.stores.length == 0) {
      return <Navigate to="/stores/link" />;
    } else {
      return (
        <div className="basicContainer gap-8 px-6">
          <span className="titlePageContainer">
            <h2>Mis tiendas</h2>
            {user.role == "admin" && (
              <NavLink
                to="/stores/link"
                className="border border-[#A8C0C8] rounded-md px-3 text-center py-1 hover:bg-slate-600 transition flex items-center gap-2"
              >
                <img src={ShopIcon} alt="" width={24} />
                <p>Añadir tienda</p>
              </NavLink>
            )}
          </span>
          <div className="gap-4 flex flex-wrap justify-center fade-in pt-12">
            {loadingStores ? (
              <div className="flex justify-center pt-6">
                <Spinner />
              </div>
            ) : (
              stores.map((store) => (
                <StatsCard
                  store_id={store._id}
                  key={store._id}
                  salesNumber={store.completed || 0}
                  reputationItems={[
                    { label: "Reputación", value: store.reputation },
                  ]}
                  salesLabel="Ventas"
                  status={store.suspended ? "Suspendida" : "Activa"}
                  title={store.alias}
                  statusColor={
                    store.suspended
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                  subEndDate={store.subscriptionEndDate}
                  subGraceDate={store.subscriptionGraceUntil}
                  subStatus={store.subscriptionStatus}
                />
              ))
            )}
          </div>
        </div>
      );
    }
  }
};

export default StoresPage;
