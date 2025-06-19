import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { isAxiosError } from "axios";

export type OptionProps = {
  label: string;
  click: (store_id: string, args?: any) => Promise<void>;
};

const Menu: React.FC<{
  store_id: string;
  classname?: string;
  active: boolean;
  options: OptionProps[];
  side?: "right" | "left";
}> = ({ store_id, classname = "", options, active, side = "right" }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async (option: OptionProps) => {
    setLoading(true);
    try {
      await option.click(store_id);
    } catch (error) {
      console.log("problemas al ejecutar: " + option.label);
      if (isAxiosError(error)) console.log(error.response?.data);
      else if (error instanceof Error) console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <span
        className={`cursor-pointer flex gap-1 justify-between py-2 relative max-w-5 ${loading ? "cursor-default" : "cursor-pointer"}`}
      >
        {loading ? (
          <Spinner size={18} />
        ) : (
          <>
            <span className="size-1 rounded-full bg-white"></span>
            <span className="size-1 rounded-full bg-white"></span>
            <span className="size-1 rounded-full bg-white"></span>
          </>
        )}
        {active ? (
          <ul
            style={{
              left: side == "left" ? "-160px" : "",
              right: side == "right" ? "-160px" : "",
            }}
            className={`${classname} z-50 absolute w-44 bg-[#3a3b40] flex flex-col py-1 text-sm`}
          >
            {options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleClick(option)}
                className="py-1 px-3 hover:bg-[#5d5f66] cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </span>
    </>
  );
};

export default Menu;
