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

const PubsSection: React.FC = () => {
  return (
    <InfoCardsContainer className="rounded-lg min-w-52" title="Publicaciones">
      <InfoCard
        title="Activas"
        description="47,529"
        icon={<SquareCheckBig size={18} />}
      />
      <InfoCard
        title="Pausadas"
        description="3,923"
        bgIconColor="#aaa2e2"
        icon={<Pause color="#275baa" size={18} />}
      />
      <InfoCard
        title="Inactivas"
        description="10,567"
        bgIconColor="#e6b3b4"
        icon={<Power color="#fe4e50" size={18} />}
      />
      <InfoCard
        title="Pendientes"
        description="20,000"
        bgIconColor="#f0d29b"
        icon={<Clock4 color="#c78f27" size={18} />}
      />
      <div className="w-full flex flex-col items-center justify-center pt-2 gap-2">
        <p>Acciones rápidas</p>
        <button className="bg-emerald-800 hover:bg-emerald-900 text-sm transition-all px-2 py-1 rounded-md w-full">
          Publicar pendientes
        </button>
        <button className="bg-red-800 hover:bg-red-900 text-sm transition-all px-2 py-1 rounded-md w-full">
          Barrido de productos
        </button>
      </div>
    </InfoCardsContainer>
  );
};

const ResumeSection: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#18222b] px-4 pb-4 pt-2 flex flex-col gap-1">
      <span className="w-full flex items-center gap-1 justify-end text-sm text-gray-300 cursor-pointer">
        <p>Últimos 30 días</p>
        <ChevronDown strokeWidth={1.2} />
      </span>
      <div className="grid grid-cols-4 w-full">
        <ResumeCard
          icon={<ChartNoAxesCombined strokeWidth={1.2} />}
          color="text-blue-300"
          label="Ventas"
          value={formatNumber(39)}
        />
        <ResumeCard
          icon={<MessageCircleX strokeWidth={1.2} />}
          color="text-red-300"
          label="Cancelaciones"
          value={formatNumber(11)}
        />
        <ResumeCard
          icon={<CircleDollarSign strokeWidth={1.2} />}
          color="text-green-300"
          label="Ventas brutas"
          value={`$${formatNumber(11000000)}`}
        />
        <ResumeCard
          icon={<BanknoteArrowUp strokeWidth={1.2} />}
          color="text-cyan-300"
          label="Ganancias"
          value={`$${formatNumber(1100000)}`}
        />
      </div>
    </div>
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
  return (
    <div className="screenContainer w-full flex p-4 gap-4">
      <section className="w-full">
        <ResumeSection />
      </section>
      <section className="">
        <PubsSection />
      </section>
    </div>
  );
};

export default StoreDashboard;
