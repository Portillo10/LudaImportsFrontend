type InfoCardProps = {
  title: string;
  description: string;
  icon: any;
  bgIconColor?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  bgIconColor = "#9cc59c",
}) => {
  return (
    <div className="bg-gray-800 rounded-lg px-3 py-2 transition-all duration-300 border border-gray-700 hover:border-green-500 flex gap-3 justify-start items-center">
      {icon && (
        <div
          style={{ backgroundColor: bgIconColor }}
          className={`text-[#178517] p-2 rounded-full`}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col justify-between">
        <p className="">{description}</p>
        <h3 className="text-xs font-medium text-gray-300">{title}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
