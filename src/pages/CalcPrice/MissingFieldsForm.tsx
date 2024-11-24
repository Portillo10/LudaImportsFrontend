import { SubmitHandler, useForm } from "react-hook-form";
import { useProduct } from "../../hooks/useProduct";
import Spinner from "../../components/Spinner/Spinner";
import { useMLApi } from "../../hooks/useMLApi";
import PredicIcon from "../../assets/icons/PredictIcon.svg";

type MissingFieldsFormProps = {
  missingFields: string[];
  sku: string;
  onSuccess?: () => void;
};

const missingFieldsEnum: Record<string, any> = {
  category_id: {
    label: "ID de categoría",
    placeholder: "Categoría de MercadoLibre",
    type: "text",
  },

  weight: {
    label: "Peso del producto",
    placeholder: "Peso en libras",
    type: "number",
  },
};

type Inputs = {
  weight?: number;
  category_id?: string;
};

const MissingFieldsForm: React.FC<MissingFieldsFormProps> = ({
  missingFields,
  sku,
  onSuccess,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { updateProduct, loading } = useProduct();
  const { predictCategory, loading: predictLoading } = useMLApi();

  const onSumbmit: SubmitHandler<Inputs> = async (data) => {
    const result = await updateProduct(data, sku);
    if (result && onSuccess) {
      onSuccess();
      reset();
    }
  };

  const onClick = async () => {
    const category_id: string = (await predictCategory(sku))[0].category_id;
    setValue("category_id", category_id);
  };

  return (
    <form
      onSubmit={handleSubmit(onSumbmit)}
      className="w-full flex flex-col gap-3 items-center"
    >
      {missingFields.map((missingField, i) => {
        return (
          <span className="inputBox" key={i}>
            <span className="flex gap-2 items-center">
              <label className="text-sm ">
                {missingFieldsEnum[missingField].label}
              </label>
              {missingField == "category_id" && (
                <button
                  className="flex gap-1 bg-[#4CAF50] rounded-md px-1"
                  onClick={onClick}
                  type="button"
                >
                  <p className="text-xs ">Predecir</p>
                  <img src={PredicIcon} width={16} alt="" />
                </button>
              )}
              {predictLoading && <Spinner size={18} />}
            </span>
            <input
              className="input text-center"
              type={missingFieldsEnum[missingField].type}
              autoComplete="off"
              placeholder={missingFieldsEnum[missingField].placeholder}
              {...register(missingField, { required: true })}
            />
          </span>
        );
      })}
      <button type="submit" disabled={loading} className="button mt-2">
        {loading ? <Spinner size={12} /> : "Enviar"}
      </button>
    </form>
  );
};

export default MissingFieldsForm;
