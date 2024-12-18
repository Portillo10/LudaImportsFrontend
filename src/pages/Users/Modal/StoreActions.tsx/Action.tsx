import { useState } from "react";
import ArrowIcon from "../../../../assets/icons/ArrowIcon.svg";
import Spinner from "../../../../components/Spinner/Spinner";
import { useForm } from "react-hook-form";

type ActionProps = {
  children: any;
  label: string;
  displayed: boolean;
  index: number;
  onSubmit: () => Promise<void>;
};

const Action: React.FC<ActionProps> = ({
  children,
  onSubmit,
  label,
  displayed,
}) => {
  //   const [displayed, setDisplayed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { handleSubmit } = useForm();

  const submit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#1e1e1e]">
      <span className="flex flex-col justify-between w-full border-b border-t border-[#383838]">
        <div className="flex items-center w-full justify-between py-2 px-3 cursor-pointer">
          <p>{label}</p>
          <img
            width={16}
            src={ArrowIcon}
            className={displayed ? "rotate-180" : ""}
          />
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className={`${displayed ? "max-h-36 py-4" : "max-h-0"} transition-all flex flex-col items-center w-full overflow-hidden px-4 gap-4`}
        >
          {loading ? <Spinner></Spinner> : children}
        </form>
      </span>
    </div>
  );
};

export default Action;
