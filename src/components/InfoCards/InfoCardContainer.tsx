// InfoCardsContainer Component
import { SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type InfoCardsContainerProps = {
  title?: string;
  children: any;
  className?: string;
  outLink?: string;
};

const InfoCardsContainer: React.FC<InfoCardsContainerProps> = ({
  children,
  title,
  className = "",
  outLink,
}) => {
  const navigate = useNavigate();

  const onClickTitle = () => {
    if (outLink) {
      navigate(outLink);
    }
  };

  return (
    <div>
      <div className={`bg-[#18222b] p-4 ${className}`}>
        {title && (
          <h2
            onClick={onClickTitle}
            className={`text-white mb-3 flex justify-between transition-all items-center ${outLink && "cursor-pointer"}`}
          >
            <p>{title}</p>
            {outLink && <SquareArrowOutUpRight size={20} />}
          </h2>
        )}
        <div className="grid grid-rows-4 grid-cols-1 gap-2">{children}</div>
      </div>
    </div>
  );
};

export default InfoCardsContainer;
