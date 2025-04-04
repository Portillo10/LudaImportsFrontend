import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../types/user";
import { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import Select from "../../../components/Inputs/Select";
import Input from "../../../components/Inputs/Input";

type Inputs = {
  sku: string;
  store_id: string;
  category_id: string;
  dimensions: string;
  weight: string;
};

type PostBySkuFormProps = {
  user: IUser | null;
  onSubmitHandler: (data: any) => Promise<void>;
};

const PostBySkuForm: React.FC<PostBySkuFormProps> = ({
  user,
  onSubmitHandler,
}) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await onSubmitHandler(data);
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-4 p-6 border border-gray-900 shadow-sm shadow-black rounded-md">
        <div className="flex gap-4">
          <Select
            label="Tienda"
            name="store_id"
            register={register}
            options={user?.stores || []}
            required
          />
          <Input
            label="SKU"
            name="sku"
            placeholder="SKU del producto"
            register={register}
            required
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Categoría"
            name="category_id"
            placeholder="ID de la categoría"
            register={register}
            required
          />
          <Input
            label="Peso (opcional)"
            name="weight"
            placeholder="Peso en libras"
            register={register}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Dimensiones (opcional)"
            name="dimensions"
            placeholder="Lado x Ancho x Alto"
            register={register}
          />
        </div>
      </div>
      <button
        disabled={loading}
        className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] w-24 h-10 mt-2 flex justify-center`}
      >
        {loading ? <Spinner size={22} /> : "Continuar"}
      </button>
    </form>
  );
};

export default PostBySkuForm;
