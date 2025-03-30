import ArrowIcon from "../../assets/icons/ArrowIcon.svg";

type AccordeonProps = {
  children: any;
  label: string;
  displayed: boolean;
  onClick: () => void;
};

const Accordeon: React.FC<AccordeonProps> = ({
  children,
  label,
  displayed,
  onClick,
}) => {
  return (
    <div className="w-full flex flex-col items-center bg-[#1e1e1e]">
      <span className="flex flex-col justify-between w-full border-b border-t border-[#383838]">
        <div
          onClick={onClick}
          className="flex items-center w-full justify-between py-2 px-3 cursor-pointer"
        >
          <p>{label}</p>
          <img
            width={16}
            src={ArrowIcon}
            className={displayed ? "rotate-180" : ""}
          />
        </div>
        <div
          style={{ transition: displayed ? "all 600ms" : "all 200ms" }}
          className={`${displayed ? "max-h-96" : "max-h-0"} flex flex-col items-center w-full overflow-hidden`}
        >
          {children}
        </div>
      </span>
    </div>
  );
};

export default Accordeon;
