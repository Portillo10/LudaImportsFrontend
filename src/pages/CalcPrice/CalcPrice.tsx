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
import { useSideBarStore } from "../../store/MenuStore";
import Select from "../../components/Inputs/Select";

const tableColumns = [
  { key: "label", label: "" },
  { key: "value", label: "", class: "text-green-500 font-semibold" },
];

type Inputs = {
  sku: string;
  store_id?: string;
};

const CalcPrice: React.FC<{ pageIndex?: number }> = ({ pageIndex }) => {
  const {
    loading,
    toastMsg,
    priceRows,
    toastType,
    calcPrice,
    closeToast,
    closeModal,
    activeToast,
    activeModal,
    missingFields,
    setActiveModal,
    getInitialPriceInfo,
  } = useCalcPrice();

  const { user } = useAuth();
  const hasStores = user && user.stores.length > 0;

  const { savePricing, getPricing } = useStores();
  const [fixedCost, setFixedCosts] = useState<number>(0);
  const [profitData, setProfitData] = useState<PercentRange[]>([
    { range: { from: 0, to: 1 }, percentage: 0 },
    { range: { from: 1, to: null }, percentage: 0 },
  ]);
  const [fixedCostsData, setFixedCostsData] = useState<PercentRange[]>([
    { range: { from: 0, to: 1 }, percentage: 0 },
    { range: { from: 1, to: null }, percentage: 0 },
  ]);

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const { setCurrentIndexPage } = useSideBarStore();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getInitialPriceInfo();
    setCurrentIndexPage(pageIndex || 2);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await calcPrice(data);
  };

  const onSuccessUpdate = async () => {
    if (buttonRef.current) {
      buttonRef.current.click();
      setActiveModal(false);
    }
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
        newData[i + 1].range.from = currRange.range.to;
      }

      if (
        postUpdatedRange &&
        postUpdatedRange.range.to &&
        postUpdatedRange.range.to <= postUpdatedRange.range.from
      ) {
        newData[i + 1].range.to = postUpdatedRange.range.from;
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
    <div className="basicContainer gap-5 fade-in flex items-center">
      <span className="titlePageContainer">
        <h2>Calcular Precios</h2>
      </span>
      <div className="flex w-auto justify-center gap-6">
        <section className="flex flex-col min-w-[450px] px-4 gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 max-w-md pr-2"
          >
            <Select
              label=""
              placholder="Seleccione una tienda"
              name="store_id"
              options={user ? user.stores : []}
              register={register}
            />

            <span className="flex gap-2 w-full">
              <input
                type="text"
                className="input w-full"
                placeholder="SKU del producto"
                {...register("sku", { required: true })}
              />
              <button
                ref={buttonRef}
                disabled={loading || !hasStores}
                className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] transition-all`}
              >
                {loading ? (
                  <Spinner size={16} />
                ) : (
                  <img src={SendIcon} alt="" width={18} />
                )}
              </button>
            </span>
          </form>
          <div className="h-full max-w-md border border-[#5A5B60] rounded-xl mb-4">
            <Table
              columns={tableColumns}
              rowsData={priceRows}
              withHeader={false}
            />
          </div>
        </section>
        <section className="w-full flex justify-evenly items-start gap-6 h-min sticky">
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
          </span>
        </section>
      </div>
      {activeToast && (
        <Toast
          message={toastMsg}
          onClose={closeToast}
          type={toastType || "warning"}
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
