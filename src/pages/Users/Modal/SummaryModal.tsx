import Modal from "../../../components/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMLApi } from "../../../hooks/useMLApi";
import DateInput from "../../../components/Inputs/DateInput";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { formatNumber } from "../../../utils/helpers";

type ModalProps = {
  openModal: boolean;
  store_id: string;
  date_from: string | null;
  close: () => void;
};

type CalculateSummaryInputs = {
  to: string;
  from: string;
};

const SummaryModal: React.FC<ModalProps> = ({
  store_id,
  openModal,
  close,
  date_from,
}) => {
  const now = new Date();
  let from = date_from ? new Date(date_from) : null;
  if (!from) {
    from = new Date(now);
    from.setMonth(now.getMonth() - 1);
  }

  const { register, handleSubmit, watch } = useForm<CalculateSummaryInputs>({
    defaultValues: {
      from: from.toISOString().split("T")[0],
      to: now.toISOString().split("T")[0],
    },
  });
  const { calculateSummary, loading } = useMLApi();
  const [summary, setSummary] = useState<any>();

  const onSubmit: SubmitHandler<CalculateSummaryInputs> = async (data) => {
    const response = await calculateSummary({ ...data, store_id });
    if (response) setSummary(response.data);
  };

  useEffect(() => {
    (async () => {
      const data = watch();
      const response = await calculateSummary({ ...data, store_id });
      if (response) setSummary(response.data);
    })();
  }, []);

  return (
    <Modal
      title="Calcule el rendimiento de la tienda"
      isOpen={openModal}
      onClose={close}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 gap-5 "
      >
        <span className="flex gap-3 items-center">
          <DateInput
            register={register}
            label="Desde"
            name="from"
            required
            value={watch().from}
          />
          <DateInput
            register={register}
            label="hasta"
            name="to"
            required
            value={watch().to}
          />
        </span>
        <div className="flex flex-col w-full">
          {loading ? (
            <div className="flex justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <>
              <span className="flex gap-2 p-1 bg-[#232427]">
                <p className="w-44">Ventas brutas:</p>
                <p className="text-green-300">
                  {summary ? `$${formatNumber(summary?.gross_sales)}` : 0}
                </p>
              </span>
              <span className="flex gap-2 p-1 bg-[#414249] border-x border-[#232427]">
                <p className="w-44">Ganancias:</p>
                <p className="text-green-300">
                  {summary ? `$${formatNumber(summary?.profit)}` : 0}
                </p>
              </span>
              <span className="flex gap-2 p-1 bg-[#232427]">
                <p className="w-44">Número de ventas:</p>
                <p>{summary?.sales.length}</p>
              </span>
            </>
          )}
        </div>
        <button className="bg-[#4A7F50] py-1 px-2 rounded-md hover:bg-[#3B6541] transition-all">
          Calcular
        </button>
      </form>
    </Modal>
  );
};

export default SummaryModal;
