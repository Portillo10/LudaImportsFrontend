import React from "react";
import "./styles.css";
import { reputationColors } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { getStatusInfo, StatusInfo } from "../../utils/statusHelper";

interface StatsCardProps {
  title: string;
  status: string;
  statusColor?: string;
  reputationItems: { label: string; value?: string }[];
  salesNumber: number;
  salesLabel: string;
  store_id: string;
  subEndDate?: string;
  subGraceDate?: string;
  subStatus?: string;
}

const StatusBadge: React.FC<{ info: StatusInfo }> = ({ info }) => {
  const deafultClass =
    "py-0.5 px-1 text-[10px] absolute left-0.5 bottom-0.5 rounded-lg";

  if (info.graceDays) {
    return (
      <span className={`${deafultClass} bg-yellow-100 text-yellow-800`}>
        Expira en {info.graceDays} días
      </span>
    );
  }
  return <></>;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  status,
  statusColor = "bg-green-100 text-green-800",
  reputationItems,
  salesNumber,
  salesLabel,
  store_id,
  subEndDate,
  subGraceDate,
  subStatus,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stores/${store_id}/dashboard`);
  };

  let statusResult: undefined | StatusInfo;
  if (subEndDate && subGraceDate) {
    statusResult = getStatusInfo({
      endDate: new Date(subEndDate),
      graceUntil: new Date(subGraceDate),
      status: subStatus,
    });
  }

  return (
    <div
      className="store-card hover:shadow-neon-blue fade-in relative"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span
          className={`px-1 py-0.5 rounded-s-full text-[11px] font-medium ${statusResult?.bgColor || statusColor} ${statusResult?.textColor} absolute right-0 min-w-16 text-center`}
        >
          {statusResult?.label || status}
        </span>
      </div>

      <div className="flex gap-6 justify-between">
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
        <div className="pl-4 border-l border-gray-500">
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
      {statusResult && <StatusBadge info={statusResult} />}
    </div>
  );
};

export default StatsCard;
