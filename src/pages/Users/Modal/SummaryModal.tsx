import { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMLApi } from "../../../hooks/useMLApi";

type ModalProps = {
  openModal: boolean;
  store_id?: string;
  close: () => void;
};

type CalculateSummaryInputs = {
  store_id: string;
  to: Date;
  from: Date;
};

const SummaryModal: React.FC<ModalProps> = ({ store_id, openModal, close }) => {
  useEffect(() => {}, [openModal]);
  const { register, handleSubmit } = useForm<CalculateSummaryInputs>();
  const { calculateSummary } = useMLApi();

  const onSubmit: SubmitHandler<CalculateSummaryInputs> = async (data) => {
    const response = await calculateSummary(data);
    console.log(response, register, store_id);
  };

  return (
    <Modal isOpen={openModal} onClose={close}>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </Modal>
  );
};

export default SummaryModal;
