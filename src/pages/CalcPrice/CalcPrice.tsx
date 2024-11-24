import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import Spinner from "../../components/Spinner/Spinner";
import Table from "../../components/Table/Table";
import Toast from "../../components/Toast/Toast";

import SendIcon from "../../assets/icons/SendIcon.svg";

import { useCalcPrice } from "../../hooks/useCalcPrice";
import Modal from "../../components/Modal/Modal";
import MissingFieldsForm from "./MissingFieldsForm";

const tableColumns = [
  { key: "label", label: "" },
  { key: "value", label: "", class: "text-green-500 font-semibold" },
];

type Inputs = {
  sku: string;
};

const CalcPrice: React.FC = () => {
  const {
    calcPrice,
    closeModal,
    getInitialPriceInfo,
    setActiveModal,
    setErrorMsg,
    loading,
    priceRows,
    missingFields,
    activeModal,
    errorMsg,
  } = useCalcPrice();
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getInitialPriceInfo();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await calcPrice(data.sku);
    if (result?.status == 200) {
      setSuccessMsg("Operación exitosa.");
      setActiveToast(true);
    }
  };

  const onSuccessUpdate = async () => {
    if (buttonRef.current) {
      buttonRef.current.click();
      setActiveModal(false);
    }
  };

  const onCloseToast = () => {
    setActiveToast(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <div className="basicContainer gap-5">
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
              ref={buttonRef}
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
          <div className="max-h-[calc(100vh-220px)] overflow-auto max-w-md pr-2">
            <Table
              columns={tableColumns}
              rowsData={priceRows}
              withHeader={false}
            />
          </div>
        </section>
        <section>
          <span className=""></span>
        </section>
      </div>
      {activeToast && (
        <Toast
          message={errorMsg != "" ? errorMsg : successMsg}
          onClose={onCloseToast}
          type={errorMsg != "" ? "error" : "success"}
        />
      )}

      <Modal
        title="Atributos faltantes"
        isOpen={activeModal}
        onClose={closeModal}
        className="max-w-96"
      >
        <MissingFieldsForm
          onSuccess={onSuccessUpdate}
          missingFields={missingFields}
          sku={watch().sku}
        />
      </Modal>
    </div>
  );
};

export default CalcPrice;
