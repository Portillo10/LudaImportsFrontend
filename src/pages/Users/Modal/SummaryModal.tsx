import Modal from "../../../components/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMLApi } from "../../../hooks/useMLApi";
import DateInput from "../../../components/Inputs/DateInput";

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
  const { calculateSummary } = useMLApi();

  const onSubmit: SubmitHandler<CalculateSummaryInputs> = async (data) => {
    const response = await calculateSummary({ ...data, store_id });
    console.log(response);
  };

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
        <button className="bg-[#4A7F50] py-1 px-2 rounded-md hover:bg-[#3B6541] transition-all">
          Calcular
        </button>
      </form>
    </Modal>
  );
};

export default SummaryModal;
