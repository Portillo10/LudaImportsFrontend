import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import Spinner from "../../components/Spinner/Spinner";
import Table from "../../components/Table/Table";
import Toast from "../../components/Toast/Toast";

import SendIcon from "../../assets/icons/SendIcon.svg";

import { useMLApi } from "../../hooks/useMLApi";
import { isAxiosError } from "axios";

const tableColumns = [
  { key: "label", label: "" },
  { key: "value", label: "", class: "text-green-500 font-semibold" },
];

type Inputs = {
  sku: string;
};

const CalcPrice: React.FC = () => {
  const { calcPrice, getInitialPriceInfo, loading } = useMLApi();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [priceRows, setPriceRows] = useState<
    { label: string; value: string }[]
  >(getInitialPriceInfo() || []);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const calcPriceResult = await calcPrice(data.sku);
      if (calcPriceResult) {
        setPriceRows(calcPriceResult);
      } else {
        throw new Error(
          "Error calculando precio, por favor, inténtelo más tarde"
        );
      }
    } catch (error) {
      setActiveToast(true);
      if (error instanceof Error) {
        if (isAxiosError(error)) {
          if (error.response?.data.error) {
            setErrorMsg(error.response?.data.error);
          } else {
            setErrorMsg(error.message);
          }
        } else {
          setErrorMsg(error.message);
        }
      }
    }
  };

  const onCloseToast = () => {
    setActiveToast(false);
  };

  return (
    <div className="basicContainer max-h-full gap-5">
      <span className="titlePageContainer">
        <h2>Calcular Precios</h2>
      </span>
      <div className="flex justify-between w-full">
        <section className="flex flex-col w-full px-4 gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 max-w-md pr-2"
          >
            <input
              type="text"
              className="input w-full"
              placeholder="SKU del producto"
              {...register("sku", { required: true })}
            />
            <button
              disabled={loading}
              className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541]`}
            >
              {loading ? (
                <Spinner size={16} />
              ) : (
                <img src={SendIcon} alt="" width={18} />
              )}
            </button>
          </form>
          <div className="max-h-96 overflow-auto max-w-md pr-2">
            <Table
              columns={tableColumns}
              rowsData={priceRows}
              withHeader={false}
            />
          </div>
        </section>
      </div>
      {activeToast && (
        <Toast message={errorMsg} onClose={onCloseToast} type="error" />
      )}
    </div>
  );
};

export default CalcPrice;
