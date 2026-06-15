import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  PauseCircle,
  XOctagon,
  Clock,
  Upload,
  PenLine,
  ChartNoAxesCombined,
  MessageCircleX,
  CircleDollarSign,
  BanknoteArrowUp,
  ActivitySquare,
  CalendarCheck2,
  CalendarX2,
  PiggyBank,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import storeService from "../../services/storeService";
import { useSubscription } from "../../hooks/useSubscription";
import { getStatusInfo } from "../../utils/statusHelper";
import { formatNumber } from "../../utils/helpers";
import Spinner from "../../components/Spinner/Spinner";
import { useSideBarStore } from "../../store/MenuStore";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ItemsInfo {
  active: number;
  paused: number;
  under_review: number;
  pending: number;
}

interface ResumeInfo {
  sales: any[];
  cancellations: any[];
  gross_sales: number;
  profit: number;
}

interface SubscriptionInfo {
  statusLabel: string;
  startDate?: string;
  endDate?: string;
  amountToPay?: number;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// Stat card — top row
const StatCard: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverBorder: string;
  valueColor?: string;
  textSize?: string;
}> = ({
  label,
  value,
  icon,
  iconBg,
  hoverBorder,
  valueColor,
  textSize = "text-2xl",
}) => (
  <div
    className={`bg-[#1a1d23] border border-[#2d333b] p-6 rounded-xl shadow-sm transition-colors ${hoverBorder}`}
  >
    <div className="mb-4 flex items-center gap-2">
      <div className={`p-2 rounded-lg w-fit ${iconBg}`}>{icon}</div>
      <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">
        {label}
      </p>
    </div>
    <p
      className={`${textSize} font-extrabold mt-1 leading-none ${valueColor ?? "text-white"}`}
    >
      {value}
    </p>
  </div>
);

// Resume card — used inside sections
// const ResumeCard: React.FC<{
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   color?: string;
// }> = ({ icon, label, value, color = "text-green-300" }) => (
//   <div className="bg-[#353b40] rounded-lg px-3 py-2 border border-gray-700 transition-all duration-300">
//     <span className={`flex justify-between items-center gap-6 ${color}`}>
//       <p className="text-sm">{label}</p>
//       {icon}
//     </span>
//     <h3 className="text-lg text-white font-semibold">{value}</h3>
//   </div>
// );

// Publication row — right sidebar
const PublicationRow: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
  bgColor: string;
  label: string;
  count: string;
}> = ({ icon, iconBg, borderColor, bgColor, label, count }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-xl border ${bgColor} ${borderColor}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${iconBg}`}
      >
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-200">{label}</span>
    </div>
    <span className="text-lg font-extrabold text-white">
      {isNaN(parseInt(count)) ? "0" : count}
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const ResumeSection: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<ResumeInfo>({
    sales: [],
    cancellations: [],
    gross_sales: 0,
    profit: 0,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await storeService.getResume(store_id, 30);
        setResume(response.resume);
      } catch {}
      setLoading(false);
    })();
  }, [store_id]);

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatCard
        label="Ventas Totales"
        value={formatNumber(resume.sales.length)}
        icon={<ChartNoAxesCombined size={20} className="text-blue-400" />}
        iconBg="bg-blue-500/10"
        hoverBorder="hover:border-blue-500/40"
      />
      <StatCard
        label="Cancelaciones"
        value={formatNumber(resume.cancellations.length)}
        icon={<MessageCircleX size={20} className="text-rose-500" />}
        iconBg="bg-rose-500/10"
        hoverBorder="hover:border-rose-500/40"
      />
      <StatCard
        label="Ventas Brutas"
        value={`$${formatNumber(resume.gross_sales)}`}
        icon={<CircleDollarSign size={20} className="text-green-400" />}
        iconBg="bg-green-500/10"
        hoverBorder="hover:border-green-500/40"
      />
      <StatCard
        label="Ganancias"
        value={`$${formatNumber(resume.profit)}`}
        valueColor="text-emerald-400"
        icon={<BanknoteArrowUp size={20} className="text-purple-400" />}
        iconBg="bg-purple-500/10"
        hoverBorder="hover:border-purple-500/40"
      />
    </section>
  );
};

const SubscriptionResume: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
    null,
  );
  const { getSubscription } = useSubscription();

  useEffect(() => {
    (async () => {
      const data = await getSubscription(store_id);
      if (data) {
        const statusInfo = getStatusInfo({
          endDate: new Date(data.endDate),
          graceUntil: new Date(data.graceUntil),
          status: data.status,
        });
        setSubscription({ ...data, statusLabel: statusInfo.label });
      }
    })();
  }, [store_id]);

  return (
    <div className=" border border-[#2d333b] pb-4 pt-3 rounded-xl flex flex-col gap-3">
      <p className="font-semibold text-white">Membresía</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <StatCard
          hoverBorder=""
          iconBg="text-sky-300"
          textSize="text-lg"
          icon={<ActivitySquare strokeWidth={1.2} size={18} />}
          //   color="text-sky-300"
          label="Estado"
          value={subscription?.statusLabel ?? "Sin membresía"}
        />
        <StatCard
          hoverBorder=""
          iconBg="text-green-300"
          textSize="text-lg"
          icon={<CalendarCheck2 strokeWidth={1.2} size={18} />}
          //   color="text-green-300"
          label="Fecha de inicio"
          value={
            subscription?.startDate
              ? new Date(subscription.startDate).toLocaleDateString()
              : "Sin registros"
          }
        />
        <StatCard
          hoverBorder=""
          iconBg="text-yellow-300"
          textSize="text-lg"
          icon={<CalendarX2 strokeWidth={1.2} size={18} />}
          //   color="text-yellow-300"
          label="Fecha de pago"
          value={
            subscription?.endDate
              ? new Date(subscription.endDate).toLocaleDateString()
              : "Pendiente"
          }
        />
        <StatCard
          hoverBorder=""
          iconBg="text-indigo-300"
          textSize="text-lg"
          icon={<PiggyBank strokeWidth={1.2} size={18} />}
          //   color="text-indigo-300"
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

const PubsSection: React.FC<{ store_id: string }> = ({ store_id }) => {
  const [loading, setLoading] = useState(false);
  const [itemsInfo, setItemsInfo] = useState<ItemsInfo>({
    active: 0,
    paused: 0,
    under_review: 0,
    pending: 0,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await storeService.getItemsCount(store_id, {
          state: { $in: ["active", "paused", "under_review", "pending"] },
        });
        setItemsInfo(response.items_count);
      } catch {}
      setLoading(false);
    })();
  }, [store_id]);

  return (
    <div className="flex flex-col gap-4">
      {/* Publications stats */}
      <section className="bg-[#1a1d23] border border-[#2d333b] p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-extrabold text-white">Publicaciones</h3>
          <NavLink
            to={`/stores/${store_id}/items`}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            Ver todo
          </NavLink>
        </div>
        {loading ? (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-3">
            <PublicationRow
              icon={<CheckCircle2 size={16} />}
              iconBg="bg-emerald-500 shadow-lg shadow-emerald-500/20"
              bgColor="bg-emerald-500/5"
              borderColor="border-emerald-500/10"
              label="Activas"
              count={formatNumber(itemsInfo.active)}
            />
            <PublicationRow
              icon={<PauseCircle size={16} />}
              iconBg="bg-blue-500 shadow-lg shadow-blue-500/20"
              bgColor="bg-blue-500/5"
              borderColor="border-blue-500/10"
              label="Pausadas"
              count={formatNumber(itemsInfo.paused)}
            />
            <PublicationRow
              icon={<XOctagon size={16} />}
              iconBg="bg-rose-500 shadow-lg shadow-rose-500/20"
              bgColor="bg-rose-500/5"
              borderColor="border-rose-500/10"
              label="Inactivas"
              count={formatNumber(itemsInfo.under_review)}
            />
            <PublicationRow
              icon={<Clock size={16} />}
              iconBg="bg-amber-500 shadow-lg shadow-amber-500/20"
              bgColor="bg-amber-500/5"
              borderColor="border-amber-500/10"
              label="Pendientes"
              count={formatNumber(itemsInfo.pending)}
            />
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section className="space-y-3">
        <h3 className="font-extrabold text-white px-1">Acciones rápidas</h3>
        <NavLink to={`/stores/${store_id}/publisher-panel`} className="block">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-emerald-600 font-extrabold rounded-xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/10 group cursor-pointer">
            <Upload
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            Subir links
          </button>
        </NavLink>
        <NavLink to={`/stores/${store_id}/items`} className="block">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#1a1d23] border border-[#2d333b] text-white font-extrabold rounded-xl hover:bg-white/[0.05] transition-all group cursor-pointer">
            <PenLine
              size={18}
              className="text-slate-500 group-hover:text-white transition-colors"
            />
            Gestionar publicaciones
          </button>
        </NavLink>
      </section>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const DashboardPage: React.FC<{ pageIndex?: number }> = ({ pageIndex = 1 }) => {
  const { store_id } = useParams<{ store_id: string }>();
  const { setCurrentIndexPage } = useSideBarStore();
  if (!store_id) return null;

  useEffect(() => {
    setCurrentIndexPage(pageIndex);

    return () => {
      null;
    };
  }, []);

  return (
    <div className="p-8 space-y-6 min-h-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          <ResumeSection store_id={store_id} />
          <SubscriptionResume store_id={store_id} />
        </div>

        {/* Right column */}
        <div className="w-full lg:w-72 shrink-0">
          <PubsSection store_id={store_id} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
