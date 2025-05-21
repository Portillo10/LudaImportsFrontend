import InfoCard from "../../components/InfoCards/InfoCard";
import InfoCardsContainer from "../../components/InfoCards/InfoCardContainer";
import {
  SquareCheckBig,
  Pause,
  Power,
  Clock4,
  ChartNoAxesCombined,
  MessageCircleX,
  CircleDollarSign,
  BanknoteArrowUp,
  ChevronDown,
} from "lucide-react";
import { formatNumber } from "../../utils/helpers";
import { useEffect, useState } from "react";

import storeService from "../../services/storeService";
import Spinner from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";

const PubsSection: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [itemsInfo, setItemsInfo] = useState<any>({
    active: 0,
    paused: 0,
    under_review: 0,
    pending: 0,
  });

  const getItemsInfo = async () => {
    setLoading(true);
    try {
      const response = await storeService.getItemsCount(store_id, {
        state: { $in: ["active", "paused", "under_review", "pending"] },
      });
      setItemsInfo(response.items_count);
    } catch (error) {}
    setLoading(false);
  };

  const handleClickDeleteItems = async () => {
    setLoadingDelete(true);
    try {
      await storeService.deleteForbiddenItems(store_id);
    } catch (error) {
      console.error(
        "Error deleting items:",
        (error as AxiosError).response?.data
      );
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    getItemsInfo();
  }, [store_id]);

  return (
    <InfoCardsContainer className="rounded-lg min-w-52" title="Publicaciones">
      {loading ? (
        <div className="w-full flex justify-center pt-6">
          <Spinner />
        </div>
      ) : (
        <>
          <InfoCard
            title="Activas"
            description={formatNumber(itemsInfo.active)}
            icon={<SquareCheckBig size={18} />}
          />
          <InfoCard
            title="Pausadas"
            description={formatNumber(itemsInfo.paused)}
            bgIconColor="#aaa2e2"
            icon={<Pause color="#275baa" size={18} />}
          />
          <InfoCard
            title="Inactivas"
            description={formatNumber(itemsInfo.under_review)}
            bgIconColor="#e6b3b4"
            icon={<Power color="#fe4e50" size={18} />}
          />
          <InfoCard
            title="Pendientes"
            description={formatNumber(itemsInfo.pending)}
            bgIconColor="#f0d29b"
            icon={<Clock4 color="#c78f27" size={18} />}
          />
          <div className="w-full flex flex-col items-center justify-center pt-2 gap-2">
            <p>Acciones rápidas</p>
            <button className="bg-emerald-800 hover:bg-emerald-900 text-sm transition-all px-2 py-1 rounded-md w-full">
              Publicar pendientes
            </button>
            <button
              onClick={handleClickDeleteItems}
              disabled={loadingDelete}
              className={`${loadingDelete ? "bg-red-800" : "bg-red-900"} hover:bg-red-900 text-sm transition-all px-2 py-1 rounded-md w-full`}
            >
              Barrido de productos
            </button>
          </div>
        </>
      )}
    </InfoCardsContainer>
  );
};

const ResumeSection: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [days, setDays] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [resume, setResume] = useState<any>({
    sales: 0,
    cancellations: 0,
    gross_sales: 0,
    profit: 0,
  });

  const getResume = async () => {
    setLoading(true);
    try {
      const response = await storeService.getResume(store_id, days);
      setResume(response.resume);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setDays(30);
  }, []);

  useEffect(() => {
    getResume();
  }, [store_id, days]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-lg bg-[#18222b] px-4 pb-4 pt-2 flex flex-col gap-1">
          <span className="w-full flex items-center gap-1 justify-end text-sm text-gray-300 cursor-pointer">
            <p>Últimos {days} días</p>
            <ChevronDown strokeWidth={1.2} />
          </span>
          <div className="grid grid-cols-4 w-full">
            <ResumeCard
              icon={<ChartNoAxesCombined strokeWidth={1.2} />}
              color="text-blue-300"
              label="Ventas"
              value={formatNumber(resume.sales.length)}
            />
            <ResumeCard
              icon={<MessageCircleX strokeWidth={1.2} />}
              color="text-red-300"
              label="Cancelaciones"
              value={formatNumber(resume.cancellations.length)}
            />
            <ResumeCard
              icon={<CircleDollarSign strokeWidth={1.2} />}
              color="text-green-300"
              label="Ventas brutas"
              value={`$${formatNumber(resume.grossSales)}`}
            />
            <ResumeCard
              icon={<BanknoteArrowUp strokeWidth={1.2} />}
              color="text-cyan-300"
              label="Ganancias"
              value={`$${formatNumber(resume.profit)}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

type ResumeCardProps = {
  icon: any;
  label: string;
  value: string;
  color?: string;
};

const ResumeCard: React.FC<ResumeCardProps> = ({
  icon,
  label,
  value,
  color = "text-green-300",
}) => (
  <div className="bg-[#353b40] rounded-lg px-3 py-2 transition-all duration-300 border border-gray-700">
    <span className={`flex justify-between items-center gap-6 ${color}`}>
      <p className="text-sm">{label}</p>
      {icon}
    </span>
    <h3 className="text-xl">{value}</h3>
  </div>
);

const StoreDashboard = () => {
  const { store_id } = useParams();

  if (store_id)
    return (
      <div className="screenContainer w-full flex p-4 gap-4">
        <section className="w-full">
          <ResumeSection store_id={store_id} />
        </section>
        <section className="">
          <PubsSection store_id={store_id} />
        </section>
      </div>
    );
};

export default StoreDashboard;
