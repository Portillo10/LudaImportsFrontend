import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import Spinner from "../../components/Spinner/Spinner";
import Table from "../../components/Table/Table";
import Toast from "../../components/Toast/Toast";

import SendIcon from "../../assets/icons/SendIcon.svg";

import { useCalcPrice } from "../../hooks/useCalcPrice";
import Modal from "../../components/Modal/Modal";
import MissingFieldsForm from "./MissingFieldsForm";
import PricingTable from "../../components/PricingTable/PricingTable";
import { ISellerPricing, PercentRange } from "../../types/sellerPricing";
import { useStores } from "../../hooks/useStores";
import { useAuth } from "../../hooks/useAuth";

const tableColumns = [
  { key: "label", label: "" },
  { key: "value", label: "", class: "text-green-500 font-semibold" },
];

type Inputs = {
  sku: string;
};

const CalcPrice: React.FC = () => {
  const {
    loading,
    errorMsg,
    priceRows,
    calcPrice,
    closeModal,
    setErrorMsg,
    activeModal,
    missingFields,
    setActiveModal,
    getInitialPriceInfo,
  } = useCalcPrice();
  const { user } = useAuth();
  const { savePricing, getPricing } = useStores();
  const [activeToast, setActiveToast] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [fixedCost, setFixedCosts] = useState<number>(0);
  const [profitData, setProfitData] = useState<PercentRange[]>([
    { range: { from: 0, to: 1 }, percentage: 0 },
    { range: { from: 2, to: null }, percentage: 0 },
  ]);
  const [fixedCostsData, setFixedCostsData] = useState<PercentRange[]>([
    { range: { from: 0, to: 1 }, percentage: 0 },
    { range: { from: 2, to: null }, percentage: 0 },
  ]);

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

  const checkData = (
    index: number,
    newData: PercentRange[],
    type?: "profit" | "fixed_costs"
  ) => {
    for (let i = index; i < newData.length; i++) {
      const postUpdatedRange = newData[i + 1];
      let currRange = newData[i];

      if (postUpdatedRange && currRange.range.to) {
        newData[i + 1].range.from = currRange.range.to + 1;
      }

      if (
        postUpdatedRange &&
        postUpdatedRange.range.to &&
        postUpdatedRange.range.to <= postUpdatedRange.range.from
      ) {
        newData[i + 1].range.to = postUpdatedRange.range.from + 1;
      }
    }
    switch (type) {
      case "fixed_costs":
        setFixedCostsData(newData);
        break;
      case "profit":
        setProfitData(newData);
        break;
      default:
        console.log("type no admitido", type);
    }
  };

  const onSave = async () => {
    const data: ISellerPricing = {
      seller_id: user?._id,
      profitRanges: profitData,
      fixedCosts: fixedCost,
      fixedCostsRanges: fixedCostsData,
    };
    const response = await savePricing(data);
    return !!response;
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const response = await getPricing(user._id);
        if (response) {
          setFixedCosts(response.fixedCosts);
          setProfitData(response.profitRanges);
          setFixedCostsData(response.fixedCostsRanges);
        } else {
          console.log("response null", response);
        }
      }
    })();
  }, []);

  return (
    <div className="basicContainer gap-5 fade-in">
      <span className="titlePageContainer">
        <h2>Calcular Precios</h2>
      </span>
      <div className="flex w-full max-h-[calc(100vh-135px)]">
        <section className="flex flex-col min-w-[450px] px-4 gap-6">
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
              className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] transition-all`}
            >
              {loading ? (
                <Spinner size={16} />
              ) : (
                <img src={SendIcon} alt="" width={18} />
              )}
            </button>
          </form>
          <div className="h-full overflow-auto max-w-md border border-[#5A5B60] rounded-xl mb-4 scroll-container">
            <Table
              columns={tableColumns}
              rowsData={priceRows}
              withHeader={false}
            />
          </div>
        </section>
        <section className="w-full flex justify-evenly items-start">
          <span>
            <PricingTable
              data={profitData}
              type="profit"
              checkData={checkData}
              title="Porcentaje de ganancia"
              onSave={onSave}
            />
          </span>
          <span className="flex flex-col gap-3 items-center w-min">
            <PricingTable
              type="fixed_costs"
              data={fixedCostsData}
              checkData={checkData}
              title="Costos fijos:"
              onSave={onSave}
              price={fixedCost}
              onChangePriceInput={(value) => {
                setFixedCosts(value);
              }}
            />
            {/* <div className="flex items-center gap-2 w-min">
              <label className="w-max">Monto: </label>
              <span className="relative flex items-center">
                <input
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    onChangeFixedCostInput(parseInt(value));
                  }}
                  className="input w-32"
                  type="text"
                  value={formatNumber(fixedCost)}
                />
                <div className="absolute right-0 pr-2 text-gray-400 pointer-events-none">
                  COP
                </div>
              </span>
              <button
                title="Guardar cambios"
                className="bg-green-800 hover:bg-green-900 p-1.5 transition-all rounded-md"
              >
                <Save size={20} />
              </button>
            </div> */}
          </span>
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
