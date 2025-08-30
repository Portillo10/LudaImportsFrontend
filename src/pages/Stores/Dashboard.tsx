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
  CalendarX2,
  CalendarCheck2,
  PiggyBank,
  ActivitySquare,
} from "lucide-react";
import { formatNumber } from "../../utils/helpers";
import { useEffect, useState } from "react";

import storeService from "../../services/storeService";
import Spinner from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useSubscription } from "../../hooks/useSubscription";
import { getStatusInfo } from "../../utils/statusHelper";
import { useSideBarStore } from "../../store/MenuStore";

const CARDS_CONFIG = [
  {
    title: "Activas",
    key: "active" as const,
    icon: <SquareCheckBig size={18} />,
  },
  {
    title: "Pausadas",
    key: "paused" as const,
    bgIconColor: "#aaa2e2",
    icon: <Pause color="#275baa" size={18} />,
  },
  {
    title: "Inactivas",
    key: "under_review" as const,
    bgIconColor: "#e6b3b4",
    icon: <Power color="#fe4e50" size={18} />,
  },
  {
    title: "Pendientes",
    key: "pending" as const,
    bgIconColor: "#f0d29b",
    icon: <Clock4 color="#c78f27" size={18} />,
  },
];

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
    <InfoCardsContainer
      className="rounded-lg min-w-52"
      title="Publicaciones"
      outLink={`/stores/${store_id}/items`}
    >
      {loading ? (
        <div className="w-full flex justify-center pt-6">
          <Spinner />
        </div>
      ) : (
        <>
          {CARDS_CONFIG.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={formatNumber(itemsInfo[card.key] || 0)}
              bgIconColor={card.bgIconColor}
              icon={card.icon}
            />
          ))}
          <div className="w-full flex flex-col items-center justify-center pt-2 gap-2">
            <p>Acciones rápidas</p>
            <button className="bg-emerald-800 hover:bg-emerald-900 text-sm transition-all px-2 py-1 rounded-md w-full">
              Publicar pendientes
            </button>
            <button
              onClick={handleClickDeleteItems}
              disabled={loadingDelete}
              className={`${loadingDelete ? "bg-red-900" : "bg-red-800"} hover:bg-red-900 text-sm transition-all px-2 py-1 rounded-md w-full`}
            >
              Barrido de productos
            </button>
          </div>
        </>
      )}
    </InfoCardsContainer>
  );
};

const SubscriptionResume: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [subscription, setSubscription] = useState<any>();
  const { getSubscription } = useSubscription();

  useEffect(() => {
    (async () => {
      const subscription = await getSubscription(store_id);
      if (subscription) {
        const statusInfo = getStatusInfo({
          endDate: new Date(subscription.endDate),
          graceUntil: new Date(subscription.graceUntil),
          status: subscription.status,
        });
        setSubscription({
          ...subscription,
          statusLabel: statusInfo.label,
        });
      }
    })();
  }, []);

  return (
    <div className="rounded-lg bg-[#18222b] px-4 pb-4 pt-2 flex flex-col gap-2 ">
      <span className="w-full flex items-center">
        <p>Membresía</p>
      </span>
      <div className="grid grid-cols-4 w-full">
        <ResumeCard
          icon={<ActivitySquare strokeWidth={1.2} />}
          color="text-sky-200"
          label="Estado"
          value={
            subscription?.statusLabel
              ? subscription?.statusLabel
              : "Sin membresía"
          }
        />
        <ResumeCard
          icon={<CalendarCheck2 strokeWidth={1.2} />}
          color="text-green-300"
          label="Fecha de inicio"
          value={
            subscription?.startDate
              ? new Date(subscription.startDate).toLocaleDateString()
              : "Sin membresía"
          }
        />
        <ResumeCard
          icon={<CalendarX2 strokeWidth={1.2} />}
          color="text-yellow-300"
          label="Fecha de pago"
          value={
            subscription?.endDate
              ? new Date(subscription.endDate).toLocaleDateString()
              : "Sin membresía"
          }
        />
        <ResumeCard
          icon={<PiggyBank strokeWidth={1.2} />}
          color="text-indigo-200"
          label="Saldo a pagar"
          value={
            subscription?.amountToPay
              ? `$${formatNumber(subscription.amountToPay)}`
              : "$0"
          }
        />
      </div>
    </div>
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
        <div className="rounded-lg bg-[#18222b] px-4 pb-4 pt-2 flex flex-col gap-2">
          <span className="w-full flex items-center gap-1 justify-between ">
            <div>Resumen de ventas</div>
            <div className="text-sm text-gray-300 cursor-pointer flex items-center">
              <p>Últimos {days} días</p>
              <ChevronDown strokeWidth={1.2} />
            </div>
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
              value={`$${formatNumber(resume.gross_sales)}`}
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
    <h3 className="text-lg">{value}</h3>
  </div>
);

const StoreDashboard: React.FC<{ pageIndex?: number }> = ({
  pageIndex = 1,
}) => {
  const { store_id } = useParams();
  const { setCurrentIndexPage } = useSideBarStore();
  useEffect(() => {
    setCurrentIndexPage(pageIndex);
  }, []);
  if (store_id)
    return (
      <div className="screenContainer w-full flex p-4 gap-4 fade-in">
        <section className="w-full flex flex-col gap-2">
          <ResumeSection store_id={store_id} />
          <SubscriptionResume store_id={store_id} />
        </section>
        <section className="">
          <PubsSection store_id={store_id} />
        </section>
      </div>
    );
};

export default StoreDashboard;
