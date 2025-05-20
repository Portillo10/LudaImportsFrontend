// InfoCardsContainer Component

type InfoCardsContainerProps = {
  title?: string;
  children: any;
  className?: string;
};

const InfoCardsContainer: React.FC<InfoCardsContainerProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <div>
      <div className={`bg-[#18222b] p-4 ${className}`}>
        {title && <h2 className="text-white mb-3">{title}</h2>}
        <div className="grid grid-rows-4 grid-cols-1 gap-2">{children}</div>
      </div>
    </div>
  );
};

export default InfoCardsContainer;
