import { useState } from "react";
import Spinner from "../Spinner/Spinner";

type OptionProps = {
  label: string;
  click: (store_id: string) => Promise<void>;
};

const Menu: React.FC<{
  store_id: string;
  classname?: string;
  active: boolean;
  options: OptionProps[];
}> = ({ store_id, classname = "", options, active }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async (option: OptionProps) => {
    setLoading(true);
    await option.click(store_id);
    // await sleep(2000);
    setLoading(false);
  };

  return (
    <>
      <span className="cursor-pointer flex gap-1 justify-between py-2 relative">
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
            className={`${classname} z-50 absolute -right-40 w-44 bg-[#3a3b40] flex flex-col py-1 text-sm`}
          >
            {options.map((option) => (
              <li
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
