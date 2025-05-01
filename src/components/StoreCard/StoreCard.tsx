import React from "react";
import "./styles.css";
import { reputationColors } from "../../utils/constants";

interface StatsCardProps {
  title: string;
  status: string;
  statusColor?: string;
  reputationItems: { label: string; value?: string }[];
  salesNumber: number;
  salesLabel: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  status,
  statusColor = "bg-green-100 text-green-800",
  reputationItems,
  salesNumber,
  salesLabel,
}) => {
  return (
    <div className="store-card hover:shadow-neon-blue fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div className="flex gap-6">
        {/* Reputation Section */}
        <div className="space-y-1">
          {reputationItems.map((item, index) => (
            <span
              key={index}
              className="flex items-center w-full justify-between gap-3"
            >
              <p className="text-sm text-gray-200">{item.label}</p>
              <p
                className={`h-3 w-7 ${reputationColors[item.value || "default"]?.color} rounded-full`}
              ></p>
            </span>
          ))}
        </div>

        {/* Sales Section */}
        <div className="pl-3 border-l border-gray-500">
          <div className="text-center">
            <p className="text-3xl text-blue-400">{salesNumber}</p>
            <div className="inline-flex items-center text-gray-300 text-sm">
              <span className="flex items-center flex-col">
                {salesLabel}
                {/* <br />
                <span className="text-xs">En los últimos</span>
                <span className="text-xs">30 días</span> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

// Valores por defecto para hacerlo opcionalmente configurable
StatsCard.defaultProps = {
  reputationItems: [
    { label: "Cancelaciones", value: "1_red" },
    { label: "Reclamos", value: "2_orange" },
    { label: "Demoras", value: "3_yellow" },
  ],
  salesNumber: 75,
  salesLabel: "Ventas",
  statusColor: "bg-green-100 text-green-800",
};
